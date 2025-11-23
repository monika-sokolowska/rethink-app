import { TRANSPORT_ACTIVITY_IDS } from "../../../../../../config/transportConfig";

export const CLIMATIQ_API_KEY = process.env.REACT_APP_CLIMATIQ_API_KEY;
export const CLIMATIQ_API_URL = process.env.REACT_APP_CLIMATIQ_API_URL;

export const TRANSPORT_OPTIONS = [
  { value: "car", label: "Car" },
  { value: "bus", label: "Bus" },
  { value: "train", label: "Train" },
  { value: "plane", label: "Plane" },
  { value: "flight", label: "Flight" },
  { value: "airplane", label: "Airplane" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "motorbike", label: "Motorbike" },
  { value: "truck", label: "Truck" },
  { value: "bicycle", label: "Bicycle" },
  { value: "bike", label: "Bike" },
];

export const EMISSION_FACTORS = {
  car: 0.2,
  bus: 0.1,
  train: 0.05,
  plane: 0.25,
  flight: 0.25,
  airplane: 0.25,
  bicycle: 0,
  bike: 0,
  motorcycle: 0.12,
  motorbike: 0.12,
  truck: 0.3,
  default: 0.2,
};

export const getTransportType = (transportName) => {
  if (!transportName) return "default";
  const name = transportName.toLowerCase().trim();
  if (TRANSPORT_ACTIVITY_IDS[name]) {
    return name;
  }
  const option = TRANSPORT_OPTIONS.find((opt) => opt.value === name);
  if (option) {
    return option.value;
  }
  return "default";
};

export const getEmissionFactor = (transportName) => {
  const name = transportName.toLowerCase();
  for (const [key, value] of Object.entries(EMISSION_FACTORS)) {
    if (name.includes(key)) {
      return value;
    }
  }
  return EMISSION_FACTORS.default;
};

export const calculateFootprintLocal = (transportName, kilometers) => {
  if (!transportName || !kilometers || kilometers <= 0) {
    return 0;
  }
  const emissionFactor = getEmissionFactor(transportName);
  const footprint = kilometers * emissionFactor;
  return Math.round(footprint * 100) / 100;
};

export const calculateFootprintClimatiq = async (transportName, kilometers) => {
  try {
    const transportType = getTransportType(transportName);
    const activityId =
      TRANSPORT_ACTIVITY_IDS[transportType] || TRANSPORT_ACTIVITY_IDS.default;

    if (transportType === "bicycle" || transportType === "bike") {
      return 0;
    }

    const response = null;
    await fetch(CLIMATIQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emission_factor: {
          activity_id: activityId,
          data_version: "^21",
        },
        parameters: {
          distance: kilometers,
          distance_unit: "km",
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    const footprint = data.co2e || 0;
    return Math.round(footprint * 100) / 100;
  } catch (error) {
    console.log(error);
  }
};
