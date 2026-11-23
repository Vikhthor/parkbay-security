import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { DeleteIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"

export function ParkCheckin() {
    return (
        <div>
            <OccupancyProgress occupiedSlots={16} totalSlots={60}/>
        </div>
    )
}


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
      <AccessCodeForm/>
    </div>
  )
}



export function AccessCodeForm() {
  const [invalid, setInvalid] = useState(false)
  const [value, setValue] = useState("")

  const keys = ["1","2","3","4","5","6","7","8","9"]
  const addCode = (value: string)=>{
    setValue((prev)=>{
        return prev += value
    })
  }

  const removeCode = ()=>{
    setValue((prev)=>{
        return prev.slice(0,-1)
    })
  }

  return (
    <div className="flex items-center justify-center">
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-center">Verify access code</CardTitle>
        <CardDescription className="flex items-center justify-center">
          Ask the driver for their code, then check the plate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          {/* <div className="flex items-center justify-center">
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <Button variant="outline" size="xs">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div> */}
          <InputOTP maxLength={6} value={value} id="otp-verification" required className="relative">
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-20 *:data-[slot=input-otp-slot]:w-18 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} aria-invalid={invalid} />
              <InputOTPSlot index={1} aria-invalid={invalid} />
              <InputOTPSlot index={2} aria-invalid={invalid} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-20 *:data-[slot=input-otp-slot]:w-18 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} aria-invalid={invalid} />
              <InputOTPSlot index={4} aria-invalid={invalid} />
              <InputOTPSlot index={5} aria-invalid={invalid} />
            </InputOTPGroup>
          </InputOTP>
          {/* <FieldDescription>
            <a href="#">I no longer have access to this email address.</a>
          </FieldDescription> */}
        </Field>
        {/* <div className="flex gap-2 justify-center" id="gcells" aria-live="polite">
            {[0,1,2,3,4,5,6].map((idx)=>{
                if(value[idx]){
                    return (
                        <div 
                            className="grid h-[90px] w-[68px] place-items-center rounded-2xl bg-[color:var(--accent)] text-[color:var(--accent-ink)] text-[30px] font-semibold leading-normal font-[family-name:var(--f-mono)]"
                        >
                            {value[idx]}
                        </div>
                    )
                }
                return (
                    <div 
                        className="grid h-[90px] w-[68px] place-items-center rounded-2xl border border-dashed border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--muted)] text-[30px] font-semibold leading-normal font-[family-name:var(--f-mono)]"
                    />
                )
            })}
        </div> */}
        <div className="grid grid-cols-3 gap-6 my-4">
            {keys.map((key)=>(
                <Button 
                    className="h-16 cursor-pointer rounded-2xl border border-[color:var(--line)] text-[28px] font-medium leading-normal font-[family-name:var(--f-display)] [transition:transform_.05s,background_.1s] active:scale-[.96] active:bg-[color:var(--surface2)]" 
                    data-act="k" 
                    data-v={key}
                    onClick={()=>addCode(key)}
                >
                    {key}
                </Button>
            ))}
            <Button 
                className="h-16 cursor-pointer rounded-2xl border border-[color:var(--line)] text-[15px] font-medium leading-normal text-[color:var(--muted)] font-[family-name:var(--f-body)] [transition:transform_.05s,background_.1s] active:scale-[.96] active:bg-[color:var(--surface2)]" 
                data-act="k-clear"
                onClick={()=>setValue("")}
            >
                Clear
            </Button>
            <Button 
                className="h-16 cursor-pointer rounded-2xl border border-[color:var(--line)] text-[28px] font-medium leading-normal font-[family-name:var(--f-display)] [transition:transform_.05s,background_.1s] active:scale-[.96] active:bg-[color:var(--surface2)]" 
                data-act="k" 
                data-v="0"
                onClick={()=>addCode("0")}
            >
                0
            </Button>
            <Button 
                className="h-16 cursor-pointer rounded-2xl border border-[color:var(--line)] text-[28px] font-medium leading-normal font-[family-name:var(--f-display)] [transition:transform_.05s,background_.1s] active:scale-[.96] active:bg-[color:var(--surface2)]" 
                data-act="k-del" 
                aria-label="Delete last digit"
                onClick={()=>removeCode()}
            >
                <DeleteIcon/>
            </Button>
        </div>
      </CardContent>
        
      <CardFooter>
        <Field>
          <Button size="lg" className="h-12 w-full bg-[#fcad03] hover:bg-[#a88420]">
            Verify
          </Button>
          {/* <div className="text-sm text-muted-foreground">
            Having trouble signing in?{" "}
            <a
              href="#"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              Contact support
            </a>
          </div> */}
        </Field>
      </CardFooter>
    </Card>
    </div>
  )
}
