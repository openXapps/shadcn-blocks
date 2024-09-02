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
  SheetClose
} from "@/components/ui/sheet"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useRef, useState } from "react"



export function Dashboard() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState<string | undefined>('');
  const [year, setYear] = useState<string | undefined>('');
  const [yearList, setYearList] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

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

  const handleSearchAction = () => {
    setSearch(searchRef.current?.value);
    setSheetOpen(false);
  }

  const handleYearSelection = () => {
    setSheetOpen(false);
  }

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
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-8"
                    type="search"
                    placeholder="Search by movie title..."
                    ref={searchRef}
                  />
                </div>
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
        </main>
      </div>
    </div>
  )
}
