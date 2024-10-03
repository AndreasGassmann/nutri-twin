export interface FoodPreferenceType {
  dietType: string;
  dietTypeOther: string;
  avoidIngredients: string[];
  avoidIngredientsOther: string;
  preferredCuisines: string[];
  preferredCuisinesOther: string;
  avoidCuisines: string[];
  avoidCuisinesOther: string;
  preferredProteins: string[];
  preferredProteinsOther: string;
  favoriteVegetables: string[];
  favoriteVegetablesOther: string;
  spicePreference: string;
  sweetnessPreference: string;
  carbPreference: string[];
  foodRestrictions: string[];
  foodRestrictionsOther: string;
  preparationMethods: string[];
  healthConditions: string[];
  healthConditionsOther: string;
  glycemicIndexPreference: string;
  fatContentPreference: string;
  sugarIntakePreference: string;
  religiousRestrictions: string[];
  religiousRestrictionsOther: string;
}

export const convertPreferencesToText = (
  preferences: FoodPreferenceType
): string => {
  const lines: string[] = [];

  // Helper function to add non-empty fields
  const addIfNotEmpty = (label: string, value: string | string[]) => {
    if (Array.isArray(value) && value.length > 0) {
      lines.push(`${label}: ${value.join(", ")}.`);
    } else if (typeof value === "string" && value.trim() !== "") {
      lines.push(`${label}: ${value}.`);
    }
  };

  addIfNotEmpty("Diet type", preferences.dietType);
  addIfNotEmpty("Other diet type", preferences.dietTypeOther);
  addIfNotEmpty("Avoid ingredients", preferences.avoidIngredients);
  addIfNotEmpty(
    "Other ingredients to avoid",
    preferences.avoidIngredientsOther
  );
  addIfNotEmpty("Preferred cuisines", preferences.preferredCuisines);
  addIfNotEmpty("Other preferred cuisines", preferences.preferredCuisinesOther);
  addIfNotEmpty("Avoid cuisines", preferences.avoidCuisines);
  addIfNotEmpty("Other cuisines to avoid", preferences.avoidCuisinesOther);
  addIfNotEmpty("Preferred proteins", preferences.preferredProteins);
  addIfNotEmpty("Other preferred proteins", preferences.preferredProteinsOther);
  addIfNotEmpty("Favorite vegetables", preferences.favoriteVegetables);
  addIfNotEmpty(
    "Other favorite vegetables",
    preferences.favoriteVegetablesOther
  );
  addIfNotEmpty("Spice preference", preferences.spicePreference);
  addIfNotEmpty("Sweetness preference", preferences.sweetnessPreference);
  addIfNotEmpty("Carb preference", preferences.carbPreference);
  addIfNotEmpty("Food restrictions", preferences.foodRestrictions);
  addIfNotEmpty("Other food restrictions", preferences.foodRestrictionsOther);
  addIfNotEmpty("Preparation methods", preferences.preparationMethods);
  addIfNotEmpty("Health conditions", preferences.healthConditions);
  addIfNotEmpty("Other health conditions", preferences.healthConditionsOther);
  addIfNotEmpty(
    "Glycemic index preference",
    preferences.glycemicIndexPreference
  );
  addIfNotEmpty("Fat content preference", preferences.fatContentPreference);
  addIfNotEmpty("Sugar intake preference", preferences.sugarIntakePreference);
  addIfNotEmpty("Religious restrictions", preferences.religiousRestrictions);
  addIfNotEmpty(
    "Other religious restrictions",
    preferences.religiousRestrictionsOther
  );

  return lines.join("\n");
};

// Usage example:
// const preferencesText = convertPreferencesToText(preferences);
// console.log(preferencesText);
