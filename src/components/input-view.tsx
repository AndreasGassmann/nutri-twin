"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, ArrowLeft } from "lucide-react"

export function InputViewComponent() {
  const [menuInput, setMenuInput] = useState("")
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would typically send the menu to a server and get recommendations
    // For now, we'll just simulate a response with some food items
    const sampleRecommendations = [
      "Grilled Chicken Burger",
      "Vegetarian Pasta Primavera",
      "Spicy Tofu Stir-Fry",
      "Grilled Salmon with Roasted Vegetables",
      "Quinoa and Black Bean Salad"
    ]
    setRecommendations(sampleRecommendations)
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Food Butler Menu Analysis</CardTitle>
        <Link href="/" passHref>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Questionnaire
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="menu-input">Paste the restaurant menu here:</Label>
          <Textarea
            id="menu-input"
            value={menuInput}
            onChange={(e) => setMenuInput(e.target.value)}
            placeholder="Paste the full restaurant menu here..."
            className="min-h-[200px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="output">Our recommendations:</Label>
          <Card className="bg-muted">
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : recommendations.length > 0 ? (
                <>
                  <p className="mb-2 font-medium">Based on the menu and your preferences, we recommend the following items:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    {recommendations.map((item, index) => (
                      <li key={index} className="text-sm">{item}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Your personalized recommendations will appear here after you submit a menu.</p>
              )}
            </ScrollArea>
          </Card>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Menu
            </>
          ) : (
            "Analyze Menu"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}