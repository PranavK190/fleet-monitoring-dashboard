import { supabase } from "../lib/supabase";

export async function getDashboardMetrics() {
  const { count: totalFleet, error: fleetError } =
    await supabase
      .from("fleets")
      .select("*", {
        count: "exact",
        head: true,
      });

  if (fleetError) {
    console.error(
      "Error fetching fleet count:",
      fleetError.message
    );

    throw fleetError;
  }

  const { count: totalDrivers, error: totalDriversError } =
    await supabase
      .from("drivers")
      .select("*", {
        count: "exact",
        head: true,
      });

  if (totalDriversError) {
    console.error(
      "Error fetching total driver count:",
      totalDriversError.message
    );

    throw totalDriversError;
  }

  const { count: alerts, error: alertError } =
    await supabase
      .from("emergency_events")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("resolved", false);

  if (alertError) {
    console.error(
      "Error fetching alert count:",
      alertError.message
    );

    throw alertError;
  }

  const {
    data: activeFleetDrivers,
    error: driverError,
  } = await supabase
    .from("fleets")
    .select("driver_id")
    .eq("status", "Active")
    .not("driver_id", "is", null);

  if (driverError) {
    console.error(
      "Error fetching active drivers:",
      driverError.message
    );

    throw driverError;
  }

  const activeDriverIds = new Set(
    activeFleetDrivers.map(
      (fleet) => fleet.driver_id
    )
  );

  return {
    totalFleet: totalFleet ?? 0,
    totalDrivers: totalDrivers ?? 0,
    alerts: alerts ?? 0,
    activeDrivers: activeDriverIds.size,
  };
}