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

export function FoodPreferenceQuestionnaireComponent() {
  const router = useRouter();
  const [preferences, setPreferences] = useState({
    dietType: "",
    dietTypeOther: "",
    spiceLevel: "",
    spiceLevelOther: "",
    favoriteProtein: "",
    favoriteProteinOther: "",
    cookingFrequency: "",
    cookingFrequencyOther: "",
  });

  const handleChange = (name: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to a server
    console.log("Submitted preferences:", preferences);
    // Navigate to the second view
    router.push("/input-view");
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Food Preferences Questionnaire</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>What type of diet do you follow?</Label>
          <Select
            onValueChange={(value) => handleChange("dietType", value)}
            value={preferences.dietType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="omnivore">Omnivore</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
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
          <Label>How spicy do you like your food?</Label>
          <RadioGroup
            onValueChange={(value) => handleChange("spiceLevel", value)}
            value={preferences.spiceLevel}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mild" id="mild" />
              <Label htmlFor="mild">Mild</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">Medium</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hot" id="hot" />
              <Label htmlFor="hot">Hot</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="spice-other" />
              <Label htmlFor="spice-other">Other</Label>
            </div>
          </RadioGroup>
          {preferences.spiceLevel === "other" && (
            <Input
              placeholder="Please specify your spice preference"
              value={preferences.spiceLevelOther}
              onChange={(e) => handleChange("spiceLevelOther", e.target.value)}
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>What's your favorite protein?</Label>
          <Select
            onValueChange={(value) => handleChange("favoriteProtein", value)}
            value={preferences.favoriteProtein}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select favorite protein" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="fish">Fish</SelectItem>
              <SelectItem value="tofu">Tofu</SelectItem>
              <SelectItem value="beans">Beans</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {preferences.favoriteProtein === "other" && (
            <Input
              placeholder="Please specify your favorite protein"
              value={preferences.favoriteProteinOther}
              onChange={(e) =>
                handleChange("favoriteProteinOther", e.target.value)
              }
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>How often do you cook at home?</Label>
          <RadioGroup
            onValueChange={(value) => handleChange("cookingFrequency", value)}
            value={preferences.cookingFrequency}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily">Daily</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="few-times-a-week" id="few-times-a-week" />
              <Label htmlFor="few-times-a-week">Few times a week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rarely" id="rarely" />
              <Label htmlFor="rarely">Rarely</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="cooking-other" />
              <Label htmlFor="cooking-other">Other</Label>
            </div>
          </RadioGroup>
          {preferences.cookingFrequency === "other" && (
            <Input
              placeholder="Please specify your cooking frequency"
              value={preferences.cookingFrequencyOther}
              onChange={(e) =>
                handleChange("cookingFrequencyOther", e.target.value)
              }
            />
          )}
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
