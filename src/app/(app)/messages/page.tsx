import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"

export default function MessagesPage() {
  return (
     <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline text-foreground/90">Messages</h1>
        <p className="text-muted-foreground mt-1">Your conversations with other members.</p>
      </div>
      <Card className="flex flex-col items-center justify-center text-center p-12 min-h-[400px]">
        <CardHeader>
            <div className="mx-auto bg-secondary p-3 rounded-full">
                <MessageSquare className="h-8 w-8 text-secondary-foreground" />
            </div>
            <CardTitle className="mt-4">Coming Soon!</CardTitle>
            <CardDescription>The messaging feature is currently under construction.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">Check back later to start conversations and arrange skill swaps.</p>
        </CardContent>
      </Card>
    </div>
  )
}
