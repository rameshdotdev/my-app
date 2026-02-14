import { SectionCards } from "@/components/section-cards";
import WakaTimeDashboard from "@/components/admin/wakatime-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
export default function Page() {
  return (
    <div className="flex flex-col gap-8 px-4">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div>
            <WakaTimeDashboard />
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          {" "}
          <ChartAreaInteractive />
        </TabsContent>
      </Tabs>
    </div>
  );
}
