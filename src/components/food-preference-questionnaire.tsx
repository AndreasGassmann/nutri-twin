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
    spiceLevel: "",
    favoriteProtein: "",
    cookingFrequency: "",
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
          <Select onValueChange={(value) => handleChange("dietType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="omnivore">Omnivore</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>How spicy do you like your food?</Label>
          <RadioGroup
            onValueChange={(value) => handleChange("spiceLevel", value)}
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
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>What&apos;s your favorite protein?</Label>
          <Select
            onValueChange={(value) => handleChange("favoriteProtein", value)}
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
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>How often do you cook at home?</Label>
          <RadioGroup
            onValueChange={(value) => handleChange("cookingFrequency", value)}
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
          </RadioGroup>
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
