import { supabase } from "../lib/supabase";

export async function getDrivers() {
  const { data, error } = await supabase
    .from("drivers")
    .select("*");

  if (error) {
    console.error("Error fetching drivers:", error.message);
    throw error;
  }

  return data;
}

export async function getDriverProfile(driverId) {
  const { data: driver, error: driverError } = await supabase
    .from("drivers")
    .select("*")
    .eq("id", driverId)
    .single();

  if (driverError) {
    console.error("Error fetching driver profile:", driverError.message);
    throw driverError;
  }

  let fleet = null;

  if (driver.fleet_id) {
    const { data: fleetData, error: fleetError } = await supabase
      .from("fleets")
      .select("*")
      .eq("id", driver.fleet_id)
      .single();

    if (fleetError) {
      console.error("Error fetching driver fleet:", fleetError.message);
      throw fleetError;
    }

    fleet = fleetData;
  }

  const { data: metrics, error: metricsError } = await supabase
    .from("driver_metrics")
    .select("*")
    .eq("driver_id", driverId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (metricsError) {
    console.error(
      "Error fetching driver metrics:",
      metricsError.message
    );
    throw metricsError;
  }

  return {
    driver,
    fleet,
    latestMetric: metrics?.[0] || null,
  };
}

export async function getDriverHistory(driverId) {
  const { data, error } = await supabase
    .from("driver_metrics")
    .select("*")
    .eq("driver_id", driverId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching driver history:", error.message);
    throw error;
  }

  const validFatigueScores = data
    .map((metric) => metric.fatigue_score)
    .filter(
      (score) => score !== null && score !== undefined
    );

  const drowsyEvents = data.filter(
    (metric) =>
      metric.driver_state === "Drowsy" ||
      metric.driver_state === "DROWSY"
  );

  const unresponsiveEvents = data.filter(
    (metric) =>
      metric.driver_state === "Unresponsive" ||
      metric.driver_state === "UNRESPONSIVE"
  );

  const averageFatigue =
    validFatigueScores.length > 0
      ? validFatigueScores.reduce(
          (total, score) => total + score,
          0
        ) / validFatigueScores.length
      : null;

  const maxFatigue =
    validFatigueScores.length > 0
      ? Math.max(...validFatigueScores)
      : null;

  return {
    metrics: data,
    averageFatigue,
    maxFatigue,
    drowsyEvents: drowsyEvents.length,
    unresponsiveEvents: unresponsiveEvents.length,
  };
}