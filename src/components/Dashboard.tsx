import {
  PanelLeft,
  Search,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const years: string[] = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];

export function Dashboard() {
  return (
    <div className="">

      <div className="">
        {/* <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"> */}
        <header className="sticky top-0 flex items-center gap-3 p-4 bg-slate-100">
          <h1 className="text-lg font-bold flex-1">App Title</h1>
          <div className="hidden md:flex gap-1">
            <Button variant="link">Now Playing</Button>
            <Button variant="link">Upcoming</Button>
            <Button variant="link">Popular</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="">
                <PanelLeft className="" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription className="sr-only">Some description</SheetDescription>
              </SheetHeader>
              <div className="flex gap-2 justify-between mt-5">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Movie title..."
                    className="pl-8"
                  />
                </div>
                <Button variant="outline" className="">GO</Button>
              </div>
              <div className="flex flex-col gap-2 mt-5 md:hidden">
                <Button variant="outline">Now Playing</Button>
                <Button variant="outline">Upcoming</Button>
                <Button variant="outline">Popular</Button>
              </div>
              <div className="mt-5">
                <Select>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((v, i) => (
                      <SelectItem key={i} value={v[i]}>{v[i]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </SheetContent>
          </Sheet>

        </header>
        <main className="m-10">
          <div>Some Page Context</div>
        </main>
      </div>
    </div>
  )
}
