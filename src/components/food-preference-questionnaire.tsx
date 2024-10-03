"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function FoodPreferenceQuestionnaireComponent() {
  const router = useRouter();
  const [preferences, setPreferences] = useState({
    dietType: "",
    dietTypeOther: "",
    avoidIngredients: [] as string[],
    avoidIngredientsOther: "",
    preferredCuisines: [] as string[],
    preferredCuisinesOther: "",
    avoidCuisines: [] as string[],
    avoidCuisinesOther: "",
    preferredProteins: [] as string[],
    preferredProteinsOther: "",
    favoriteVegetables: [] as string[],
    favoriteVegetablesOther: "",
    spicePreference: "",
    sweetnessPreference: "",
    carbPreference: [] as string[],
    foodRestrictions: [] as string[],
    foodRestrictionsOther: "",
    preparationMethods: [] as string[],
    healthConditions: [] as string[],
    healthConditionsOther: "",
    glycemicIndexPreference: "",
    fatContentPreference: "",
    sugarIntakePreference: "",
    religiousRestrictions: [] as string[],
    religiousRestrictionsOther: "",
  });

  const handleChange = (name: string, value: string | string[]) => {
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    name: string,
    value: string,
    checked: boolean
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name as keyof typeof prev], value]
        : (prev[name as keyof typeof prev] as string[]).filter(
            (item) => item !== value
          ),
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted preferences:", preferences);
    router.push("/input-view");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Food Preferences Questionnaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">General Dietary Preferences</h2>

          <div className="space-y-2">
            <Label>1. What type of diet do you follow?</Label>
            <Select onValueChange={(value) => handleChange("dietType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select diet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="omnivore">
                  Omnivore (eats everything)
                </SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="pescatarian">Pescatarian</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="paleo">Paleo</SelectItem>
                <SelectItem value="low-carb">Low-carb</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {preferences.dietType === "other" && (
              <Input
                placeholder="Please specify your diet type"
                value={preferences.dietTypeOther}
                onChange={(e) => handleChange("dietTypeOther", e.target.value)}
              />
            )}
          </div>

          <div className="space-y-2">
            <Label>
              2. Which ingredients, vegetables, or food groups do you avoid?
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Dairy",
                "Gluten",
                "Meat",
                "Shellfish",
                "Eggs",
                "Nuts",
                "Soy",
                "Sugar",
                "Onions",
                "Garlic",
                "Mushrooms",
                "Peppers",
                "Spinach",
                "None",
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={`avoid-${item.toLowerCase()}`}
                    checked={preferences.avoidIngredients.includes(item)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "avoidIngredients",
                        item,
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor={`avoid-${item.toLowerCase()}`}>{item}</Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Other ingredients to avoid"
              value={preferences.avoidIngredientsOther}
              onChange={(e) =>
                handleChange("avoidIngredientsOther", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>3. What type of cuisines do you prefer?</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Italian",
                "Chinese",
                "Indian",
                "Mexican",
                "Japanese",
                "Mediterranean",
                "French",
                "American",
              ].map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cuisine-${cuisine.toLowerCase()}`}
                    checked={preferences.preferredCuisines.includes(cuisine)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "preferredCuisines",
                        cuisine,
                        checked as boolean
                      )
                    }
                  />
                  <Label htmlFor={`cuisine-${cuisine.toLowerCase()}`}>
                    {cuisine}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Other preferred cuisines"
              value={preferences.preferredCuisinesOther}
              onChange={(e) =>
                handleChange("preferredCuisinesOther", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>4. Which cuisines or flavors do you typically avoid?</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Spicy food",
                "Very sour or tangy food",
                "Very sweet dishes",
                "Raw food (e.g., sushi)",
                "Fried food",
                "None",
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={`avoid-cuisine-${item
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                    checked={preferences.avoidCuisines.includes(item)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "avoidCuisines",
                        item,
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor={`avoid-cuisine-${item
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Other cuisines or flavors to avoid"
              value={preferences.avoidCuisinesOther}
              onChange={(e) =>
                handleChange("avoidCuisinesOther", e.target.value)
              }
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Protein & Vegetable Preferences
          </h2>

          <div className="space-y-2">
            <Label>5. Which types of protein do you prefer?</Label>
            <div className="grid grid-cols-2 gap-2">
              {["Chicken", "Beef", "Pork", "Fish", "Tofu", "Lentils/Beans"].map(
                (protein) => (
                  <div key={protein} className="flex items-center space-x-2">
                    <Checkbox
                      id={`protein-${protein.toLowerCase().replace("/", "-")}`}
                      checked={preferences.preferredProteins.includes(protein)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          "preferredProteins",
                          protein,
                          checked as boolean
                        )
                      }
                    />
                    <Label
                      htmlFor={`protein-${protein
                        .toLowerCase()
                        .replace("/", "-")}`}
                    >
                      {protein}
                    </Label>
                  </div>
                )
              )}
            </div>
            <Input
              placeholder="Other preferred proteins"
              value={preferences.preferredProteinsOther}
              onChange={(e) =>
                handleChange("preferredProteinsOther", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>6. Which vegetables do you like the most?</Label>
            <div className="grid grid-cols-3 gap-2">
              {[
                "Broccoli",
                "Spinach",
                "Carrots",
                "Zucchini",
                "Bell peppers",
                "Asparagus",
                "Mushrooms",
                "Kale",
                "Cauliflower",
                "Tomatoes",
                "Cucumbers",
                "Lettuce",
              ].map((vegetable) => (
                <div key={vegetable} className="flex items-center space-x-2">
                  <Checkbox
                    id={`vegetable-${vegetable
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                    checked={preferences.favoriteVegetables.includes(vegetable)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "favoriteVegetables",
                        vegetable,
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor={`vegetable-${vegetable
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {vegetable}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Other favorite vegetables"
              value={preferences.favoriteVegetablesOther}
              onChange={(e) =>
                handleChange("favoriteVegetablesOther", e.target.value)
              }
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Taste & Carb Preferences</h2>

          <div className="space-y-2">
            <Label>7. How do you feel about spice levels in your food?</Label>
            <RadioGroup
              onValueChange={(value) => handleChange("spicePreference", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mild" id="spice-mild" />
                <Label htmlFor="spice-mild">Mild (no heat)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="spice-medium" />
                <Label htmlFor="spice-medium">Medium (a little heat)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hot" id="spice-hot" />
                <Label htmlFor="spice-hot">Hot (spicy)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-hot" id="spice-very-hot" />
                <Label htmlFor="spice-very-hot">Very hot (intense heat)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>
              8. Do you prefer dishes with a particular level of sweetness?
            </Label>
            <RadioGroup
              onValueChange={(value) =>
                handleChange("sweetnessPreference", value)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no-added" id="sweetness-no-added" />
                <Label htmlFor="sweetness-no-added">No added sweetness</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="mildly-sweet"
                  id="sweetness-mildly-sweet"
                />
                <Label htmlFor="sweetness-mildly-sweet">Mildly sweet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-sweet" id="sweetness-very-sweet" />
                <Label htmlFor="sweetness-very-sweet">Very sweet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no-preference"
                  id="sweetness-no-preference"
                />
                <Label htmlFor="sweetness-no-preference">No preference</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>
              9. Do you have a preference for the types of carbohydrates you
              consume?
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Low-carb options only",
                "Rice",
                "Potatoes",
                "Bread",
                "Pasta",
                "No preference",
              ].map((carb) => (
                <div key={carb} className="flex items-center space-x-2">
                  <Checkbox
                    id={`carb-${carb.toLowerCase().replace(/\s/g, "-")}`}
                    checked={preferences.carbPreference.includes(carb)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "carbPreference",
                        carb,
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor={`carb-${carb.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {carb}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Restrictions & Food Sensitivities
          </h2>

          <div className="space-y-2">
            <Label>10. Which of the following would you never eat?</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Raw meat or fish",
                "Organ meat (e.g., liver)",
                "Exotic meats (e.g., rabbit, frog)",
                "Insects",
                "None",
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={`restriction-${item.toLowerCase().replace(/\s/g, "-")}`}
                    checked={preferences.foodRestrictions.includes(item)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "foodRestrictions",
                        item,
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor={`restriction-${item
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Other food restrictions"
              value={preferences.foodRestrictionsOther}
              onChange={(e) =>
                handleChange("foodRestrictionsOther", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>11. Do you prefer certain preparation methods?</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Grilled",
                "Steamed",
                "Fried",
                "Raw (e.g., sashimi)",
                "Baked",
                "No preference",
              ].map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <Checkbox
                    id={`method-${method.toLowerCase().replace(/\s/g, "-")}`}
                    checked={preferences.preparationMethods.includes(method)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "preparationMethods",
                        method,
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor={`method-${method
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {method}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Health-Related Preferences</h2>

          <div className="space-y-2">
            <Label>
              12. Do you have any health conditions that affect your food
              choices?
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Diabetes",
                "High blood pressure",
                "High cholesterol",
                "None",
              ].map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={`health-${condition.toLowerCase().replace(/\s/g, "-")}`}
                    checked={preferences.healthConditions.includes(condition)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "healthConditions",
                        condition,
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor={`health-${condition
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {condition}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Other health conditions"
              value={preferences.healthConditionsOther}
              onChange={(e) =>
                handleChange("healthConditionsOther", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              13. Do you prefer foods with a low glycemic index (GI)?
            </Label>
            <RadioGroup
              onValueChange={(value) =>
                handleChange("glycemicIndexPreference", value)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="gi-yes" />
                <Label htmlFor="gi-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="gi-no" />
                <Label htmlFor="gi-no">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sometimes" id="gi-sometimes" />
                <Label htmlFor="gi-sometimes">Sometimes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no-preference" id="gi-no-preference" />
                <Label htmlFor="gi-no-preference">No preference</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>
              14. How important is the fat content of the food to you?
            </Label>
            <RadioGroup
              onValueChange={(value) =>
                handleChange("fatContentPreference", value)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low-fat" id="fat-low" />
                <Label htmlFor="fat-low">I prefer low-fat options</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="moderate-fat" id="fat-moderate" />
                <Label htmlFor="fat-moderate">
                  I don&apos;t mind moderate fat
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high-fat" id="fat-high" />
                <Label htmlFor="fat-high">
                  I prefer higher-fat foods (e.g., keto)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no-preference" id="fat-no-preference" />
                <Label htmlFor="fat-no-preference">No preference</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>15. Do you monitor your sugar intake?</Label>
            <RadioGroup
              onValueChange={(value) =>
                handleChange("sugarIntakePreference", value)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="avoid-added" id="sugar-avoid-added" />
                <Label htmlFor="sugar-avoid-added">
                  Yes, I avoid added sugars
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="avoid-certain"
                  id="sugar-avoid-certain"
                />
                <Label htmlFor="sugar-avoid-certain">
                  Yes, but only certain types of sugars (e.g., refined)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no-monitor" id="sugar-no-monitor" />
                <Label htmlFor="sugar-no-monitor">
                  No, I don&apos;t monitor it
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no-preference"
                  id="sugar-no-preference"
                />
                <Label htmlFor="sugar-no-preference">No preference</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Religious or Cultural Preferences
          </h2>

          <div className="space-y-2">
            <Label>
              16. Do you avoid any foods for religious or cultural reasons?
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Yes, I avoid pork",
                "Yes, I avoid beef",
                "Yes, I avoid alcohol",
                "Yes, I follow halal/kosher dietary rules",
                "No, I don't have any restrictions",
              ].map((restriction) => (
                <div key={restriction} className="flex items-center space-x-2">
                  <Checkbox
                    id={`religious-${restriction
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                    checked={preferences.religiousRestrictions.includes(
                      restriction
                    )}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(
                        "religiousRestrictions",
                        restriction,
                        checked as boolean
                      )
                    }
                  />
                  <Label
                    htmlFor={`religious-${restriction
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {restriction}
                  </Label>
                </div>
              ))}
            </div>
            <Input
              placeholder="Other religious or cultural restrictions"
              value={preferences.religiousRestrictionsOther}
              onChange={(e) =>
                handleChange("religiousRestrictionsOther", e.target.value)
              }
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
}
