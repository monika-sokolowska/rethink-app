const CLIMATIQ_API_KEY = process.env.REACT_APP_CLIMATIQ_API_KEY;
const CLIMATIQ_SEARCH_URL = process.env.REACT_APP_CLIMATIQ_SEARCH_URL;
export const CLIMATIQ_API_URL = process.env.REACT_APP_CLIMATIQ_API_URL;

export const searchFoodCategory = async (mealDescription) => {
  if (!mealDescription || mealDescription.trim().length < 3) {
    if (process.env.NODE_ENV === "development") {
      console.log("Meal description too short, skipping search");
    }
    return null;
  }

  if (!CLIMATIQ_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.error("Climatiq API key is not set");
    }
    return null;
  }

  try {
    const searchUrl = `${CLIMATIQ_SEARCH_URL}?data_version=^21&query=${encodeURIComponent(
      mealDescription
    )}`;

    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const firstResult = data.results[0];
      return {
        category: firstResult.category || null,
        activity_id: firstResult.activity_id || null,
        name: firstResult.name || null,
      };
    }

    return null;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Climatiq search error:", error);
    }
    return null;
  }
};

export const calculateFoodFootprintClimatiq = async (activityId, weight) => {
  if (!activityId || !weight || weight <= 0) {
    return null;
  }

  if (!CLIMATIQ_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.error("Climatiq API key is not set");
    }
    return null;
  }

  try {
    const response = await fetch(CLIMATIQ_API_URL, {
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
          weight: weight,
          weight_unit: "kg",
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (process.env.NODE_ENV === "development") {
        console.error(`Climatiq API error: ${response.status} - ${errorText}`);
      }
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    const footprint = data.co2e || 0;
    return Math.round(footprint * 100) / 100;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Climatiq food footprint calculation error:", error);
    }
    throw error;
  }
};
