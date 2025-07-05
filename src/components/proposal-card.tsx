
'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react"

type ProposalCardProps = {
  content: string;
  onRespond: (response: string) => void;
}

export default function ProposalCard({ content, onRespond }: ProposalCardProps) {
  // Simple parser for "[PROPOSAL] Date: YYYY-MM-DD, Time: Slot"
  const proposalText = content.replace('[PROPOSAL]', '').trim();
  const parts = proposalText.split(',').reduce((acc, part) => {
    const [key, value] = part.split(':').map(s => s.trim());
    if (key && value) {
      acc[key.toLowerCase()] = value;
    }
    return acc;
  }, {} as Record<string, string>);

  const { date, time } = parts;

  if (!date || !time) {
    return <p className="text-sm text-red-500">Could not parse proposal.</p>;
  }
  
  const formattedDateForResponse = new Date(date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

  const handleAccept = () => {
    onRespond(`[ACCEPTED] I've confirmed the session for ${formattedDateForResponse} in the ${time}. Looking forward to it!`);
  }

  const handleDecline = () => {
    onRespond(`[DECLINED] Unfortunately, I can't make it on ${formattedDateForResponse} in the ${time}. Can we try another time?`);
  }
  
  return (
    <Card className="my-2 w-full max-w-sm border-primary/50 shadow-md bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Calendar className="h-5 w-5 text-primary" />
          Session Proposal
        </CardTitle>
        <CardDescription>A member has proposed a time to connect.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <p className="font-semibold">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="font-semibold">{time}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleDecline}>
          <XCircle className="mr-2" />
          Decline
        </Button>
        <Button size="sm" onClick={handleAccept}>
          <CheckCircle2 className="mr-2" />
          Accept
        </Button>
      </CardFooter>
    </Card>
  )
}
