import { supabase } from "../lib/supabase";

export async function getFleets() {
  const { data: fleets, error: fleetsError } = await supabase
    .from("fleets")
    .select("*");

  if (fleetsError) {
    console.error("Error fetching fleets:", fleetsError.message);
    throw fleetsError;
  }

  const { data: drivers, error: driversError } = await supabase
    .from("drivers")
    .select("*");

  if (driversError) {
    console.error("Error fetching drivers:", driversError.message);
    throw driversError;
  }

  const driverMap = new Map(
    drivers.map((driver) => [driver.id, driver])
  );

  return fleets.map((fleet) => ({
    ...fleet,
    driver: fleet.driver_id
      ? driverMap.get(fleet.driver_id) || null
      : null,
  }));
}

export async function getFleetLiveLocation(fleetId) {
  const { data: fleet, error: fleetError } = await supabase
    .from("fleets")
    .select("*")
    .eq("id", fleetId)
    .single();

  if (fleetError) {
    console.error(
      "Error fetching fleet live location:",
      fleetError.message
    );
    throw fleetError;
  }

  let driver = null;

  if (fleet.driver_id) {
    const { data: driverData, error: driverError } = await supabase
      .from("drivers")
      .select("*")
      .eq("id", fleet.driver_id)
      .single();

    if (driverError) {
      console.error(
        "Error fetching fleet driver:",
        driverError.message
      );
      throw driverError;
    }

    driver = driverData;
  }

  return {
    fleet,
    driver,
  };
}

export async function getAvailableDrivers() {
  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .is("fleet_id", null)
    .order("name", { ascending: true });

  if (error) {
    console.error(
      "Error fetching available drivers:",
      error.message
    );
    throw error;
  }

  return data;
}

export async function createFleet(fleetData) {
  const { data: driver, error: driverError } = await supabase
    .from("drivers")
    .select("id, fleet_id")
    .eq("id", fleetData.driver_id)
    .single();

  if (driverError) {
    console.error(
      "Error checking fleet driver:",
      driverError.message
    );
    throw driverError;
  }

  if (driver.fleet_id !== null) {
    throw new Error(
      "This driver is already assigned to a fleet."
    );
  }

  const { data: fleet, error: fleetError } = await supabase
    .from("fleets")
    .insert({
      fleet_name: fleetData.fleet_name,
      vehicle_number: fleetData.vehicle_number,
      driver_id: fleetData.driver_id,

      // Every fleet created from this page is Active.
      status: "Active",

      start: fleetData.start?.trim() || null,
      destination: fleetData.destination?.trim() || null,

      // Coordinates are kept for live location.
      // They are initially empty until location data is available.
      latitude: null,
      longitude: null,
    })
    .select("*")
    .single();

  if (fleetError) {
    console.error("Error creating fleet:", fleetError.message);
    throw fleetError;
  }

  const { error: driverUpdateError } = await supabase
    .from("drivers")
    .update({
      fleet_id: fleet.id,
    })
    .eq("id", fleetData.driver_id)
    .is("fleet_id", null);

  if (driverUpdateError) {
    console.error(
      "Error assigning driver to fleet:",
      driverUpdateError.message
    );

    await supabase
      .from("fleets")
      .delete()
      .eq("id", fleet.id);

    throw driverUpdateError;
  }

  return fleet;
}

export async function updateFleet(fleetId, fleetData) {
  // Get the existing fleet first.
  const { data: existingFleet, error: existingFleetError } =
    await supabase
      .from("fleets")
      .select("*")
      .eq("id", fleetId)
      .single();

  if (existingFleetError) {
    console.error(
      "Error fetching fleet for update:",
      existingFleetError.message
    );
    throw existingFleetError;
  }

  const oldDriverId = existingFleet.driver_id;
  const newDriverId = fleetData.driver_id;

  // If the driver is being changed, make sure the new driver
  // exists and is not already assigned to another fleet.
  if (newDriverId !== oldDriverId) {
    if (!newDriverId) {
      throw new Error(
        "A driver must be assigned to the fleet."
      );
    }

    const { data: newDriver, error: newDriverError } =
      await supabase
        .from("drivers")
        .select("id, fleet_id")
        .eq("id", newDriverId)
        .single();

    if (newDriverError) {
      console.error(
        "Error checking new fleet driver:",
        newDriverError.message
      );
      throw newDriverError;
    }

    if (
      newDriver.fleet_id !== null &&
      newDriver.fleet_id !== fleetId
    ) {
      throw new Error(
        "This driver is already assigned to another fleet."
      );
    }
  }

  // Update only the editable fleet information.
  //
  // IMPORTANT:
  // latitude and longitude are intentionally NOT included here.
  // They belong to the live-location system and should not be
  // overwritten when editing the fleet.
  const { data: updatedFleet, error: fleetUpdateError } =
    await supabase
      .from("fleets")
      .update({
        fleet_name: fleetData.fleet_name,
        vehicle_number: fleetData.vehicle_number,
        driver_id: newDriverId,

        // Fleet list contains active fleets only.
        status: "Active",

        start: fleetData.start?.trim() || null,
        destination: fleetData.destination?.trim() || null,
      })
      .eq("id", fleetId)
      .select("*")
      .single();

  if (fleetUpdateError) {
    console.error(
      "Error updating fleet:",
      fleetUpdateError.message
    );
    throw fleetUpdateError;
  }

  // If the driver changed, clear the old driver's fleet assignment.
  if (oldDriverId && oldDriverId !== newDriverId) {
    const { error: oldDriverUpdateError } = await supabase
      .from("drivers")
      .update({
        fleet_id: null,
      })
      .eq("id", oldDriverId)
      .eq("fleet_id", fleetId);

    if (oldDriverUpdateError) {
      console.error(
        "Error clearing old driver fleet assignment:",
        oldDriverUpdateError.message
      );
      throw oldDriverUpdateError;
    }
  }

  // Make sure the new driver's fleet_id points to this fleet.
  if (newDriverId) {
    const { error: newDriverUpdateError } = await supabase
      .from("drivers")
      .update({
        fleet_id: fleetId,
      })
      .eq("id", newDriverId)
      .is("fleet_id", null);

    if (newDriverUpdateError) {
      console.error(
        "Error assigning new driver to fleet:",
        newDriverUpdateError.message
      );
      throw newDriverUpdateError;
    }
  }

  return updatedFleet;
}

export async function deleteFleet(fleetId) {
  // Get the fleet so we know which driver needs to be unassigned.
  const { data: fleet, error: fleetError } = await supabase
    .from("fleets")
    .select("id, driver_id")
    .eq("id", fleetId)
    .single();

  if (fleetError) {
    console.error(
      "Error fetching fleet for deletion:",
      fleetError.message
    );
    throw fleetError;
  }

  // Clear the driver's fleet assignment first.
  if (fleet.driver_id) {
    const { error: driverUpdateError } = await supabase
      .from("drivers")
      .update({
        fleet_id: null,
      })
      .eq("id", fleet.driver_id)
      .eq("fleet_id", fleetId);

    if (driverUpdateError) {
      console.error(
        "Error clearing driver fleet assignment:",
        driverUpdateError.message
      );
      throw driverUpdateError;
    }
  }

  // Now delete the fleet.
  const { data, error } = await supabase
    .from("fleets")
    .delete()
    .eq("id", fleetId)
    .select()
    .single();

  if (error) {
    console.error("Error deleting fleet:", error.message);
    throw error;
  }

  return data;
}