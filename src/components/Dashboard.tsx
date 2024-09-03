import { useEffect, useRef, useState } from "react"

// https://github.com/crashmax-dev/fireworks-js/
// import { Fireworks } from '@fireworks-js/react';
// import type { FireworksHandlers } from '@fireworks-js/react';

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
  SheetDescription,
} from "@/components/ui/sheet"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Dashboard() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string | undefined>('');
  const [year, setYear] = useState<string | undefined>('');
  const [yearList, setYearList] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  // const fwRef = useRef<FireworksHandlers>(null);
  // const fwToggle = () => {
  //   if (!fwRef.current) return
  //   if (fwRef.current.isRunning) {
  //     fwRef.current.stop()
  //   } else {
  //     fwRef.current.start()
  //   }
  // }

  useEffect(() => {
    function genYears(): string[] {
      const today = new Date();
      const year = today.getFullYear();
      const yearList = [];
      for (let n = 0; n < 110; n++) {
        yearList.push(String(year - n));
      }
      return yearList;
    };

    setYearList(genYears());

    return () => { };
  }, [])

  const handleSearchAction = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (searchRef.current?.value && searchRef.current?.value.length > 3) {
      setSearch(searchRef.current?.value);
      setSheetOpen(false);
    }
  }

  const handleYearSelection = () => {
    if (year && year?.length > 0) setSheetOpen(false);
  }

  return (
    <div className="">

      <div className="">
        <header className="sticky top-0 flex items-center gap-3 p-4 bg-slate-100">
          <h1 className="text-lg font-bold flex-1">App Title</h1>
          <div className="hidden md:flex gap-1">
            <Button variant="link">Now Playing</Button>
            <Button variant="link">Upcoming</Button>
            <Button variant="link">Popular</Button>
          </div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="">
                <PanelLeft className="" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="">
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription className="sr-only">App Side Menu</SheetDescription>
              </SheetHeader>
              <div className="flex gap-2 justify-between mt-5">
                <form onSubmit={handleSearchAction}>
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-8"
                      type="search"
                      placeholder="Search by movie title..."
                      ref={searchRef}
                    />
                  </div>
                </form>
                <Button variant="outline" className="" onClick={handleSearchAction}>Apply</Button>
              </div>
              <div className="flex gap-2 justify-between mt-3">
                <div className="flex-1">
                  <Select value={year} onValueChange={setYear}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Search by year..." />
                    </SelectTrigger>
                    <SelectContent>
                      {yearList.map((v, i) => (
                        <SelectItem key={i} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="" onClick={handleYearSelection}>Apply</Button>
              </div>
              <div className="flex flex-col gap-2 mt-5 md:hidden">
                <Button variant="outline">Now Playing</Button>
                <Button variant="outline">Upcoming</Button>
                <Button variant="outline">Popular</Button>
              </div>
            </SheetContent>
          </Sheet>

        </header>
        <main className="m-10">
          <div>{`Search string is: ${search}`}</div>
          <div>{`Year selected is: ${year}`}</div>
          {/* <>
            <div className="flex gap-4 absolute z-10">
              <Button onClick={() => fwToggle()}>Toggle</Button>
              <Button onClick={() => fwRef.current!.clear()}>Clear</Button>
            </div>
            <Fireworks
              ref={fwRef}
              options={{
                autoresize: true,
                opacity: 0.5,
                acceleration: 1.05,
                friction: 0.97,
                gravity: 1.5,
                particles: 50,
                traceLength: 3,
                traceSpeed: 10,
                explosion: 5,
                intensity: 3,
                flickering: 50,
                lineStyle: 'round',
                hue: {
                  min: 0,
                  max: 360
                },
                delay: {
                  min: 30,
                  max: 60
                },
                rocketsPoint: {
                  min: 50,
                  max: 50
                },
                lineWidth: {
                  explosion: {
                    min: 1,
                    max: 3
                  },
                  trace: {
                    min: 1,
                    max: 2
                  }
                },
                brightness: {
                  min: 50,
                  max: 80
                },
                decay: {
                  min: 0.015,
                  max: 0.03
                },
                mouse: {
                  click: true,
                  move: false,
                  max: 1
                }
              }}
              style={{
                top: "30%",
                left: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                background: '#000'
              }}
            />
          </> */}
        </main>
      </div>
    </div>
  )
}
