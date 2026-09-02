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