import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"

export function OccupancyProgress({
    occupiedSlots, 
    totalSlots
}:{ 
    occupiedSlots: number
    totalSlots: number
}) {
  return (
    <div className="mx-auto w-full max-w-lg space-y-6">
      <Progress value={parseInt(((occupiedSlots/totalSlots)*100).toFixed(0))} className="**:data-[slot=progress-track]:h-3 mx-4">
        <ProgressLabel>{occupiedSlots} of {totalSlots} inside</ProgressLabel>
        <ProgressValue />
      </Progress>
      {/* <AccessCodeForm/> */}
      <div className="mx-4">
        <Field>
            <FieldLabel htmlFor="licence-no">
                Number Plate <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
                id="licence-no"
                className="h-14 w-full rounded-[14px] border border-[color:var(--line)] bg-[color:var(--surface)] px-4 text-[color:var(--ink)] text-[22px] font-semibold leading-normal font-[family-name:var(--f-mono)] uppercase tracking-[.06em] focus:border-transparent focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-[color:var(--ink)] font-semibold tracking-[.06em] font-[family-name:var(--f-mono)]"
                placeholder="LND-421-KJ"
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                required
            />
            <FieldDescription>
            Vehicle licence plate number.
            </FieldDescription>
        </Field>
        <Field>
          <Button size="lg" className="my-4 h-12 w-full bg-[#fcad03] hover:bg-[#a88420]">
            Check In
          </Button>
        </Field>
      </div>
    </div>
  )
}

export default function EntryLogForm(){
    return (<OccupancyProgress occupiedSlots={16} totalSlots={60}/>)
}