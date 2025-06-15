
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, UserCheck, Package, Car, Calendar, Video, ClipboardList, Calculator, Zap } from "lucide-react"

const featuresList = [
  {
    icon: FileText,
    titleKey: "features.aiInvoice.title",
    descKey: "features.aiInvoice.description",
  },
  {
    icon: UserCheck,
    titleKey: "features.crewControl.title",
    descKey: "features.crewControl.description",
  },
  {
    icon: Package,
    titleKey: "features.matTrack.title",
    descKey: "features.matTrack.description",
  },
  {
    icon: Car,
    titleKey: "features.carRental.title",
    descKey: "features.carRental.description",
  },
  {
    icon: Calendar,
    titleKey: "features.smartSchedule.title",
    descKey: "features.smartSchedule.description",
  },
  {
    icon: Video,
    titleKey: "features.meetings.title",
    descKey: "features.meetings.description",
  },
  {
    icon: ClipboardList,
    titleKey: "features.appointments.title",
    descKey: "features.appointments.description",
  },
  {
    icon: Calculator,
    titleKey: "features.estimates.title",
    descKey: "features.estimates.description",
  },
  {
    icon: Zap,
    titleKey: "features.more.title",
    descKey: "features.more.description",
  },
];

export default function FeaturesOverview() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
          {t("featuresOverview.title")}
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          {t("featuresOverview.subtitle")}
        </p>
        <p className="text-base text-muted-foreground">
          {t("featuresOverview.intro")}
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {featuresList.map((f, idx) => (
          <Card key={f.titleKey} className="bg-card/90 border hover:shadow-lg transition-shadow p-0">
            <CardContent className="px-7 pt-8 pb-6 flex flex-col items-center">
              <div className="rounded-xl bg-primary/10 p-4 mb-5">
                <f.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {t(f.titleKey)}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {t(f.descKey)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="max-w-2xl mx-auto mt-14 text-center">
        <Link to="/" className="inline-block mt-2 px-6 py-2 rounded-lg border bg-muted/80 hover:bg-primary/10 text-foreground font-medium transition">
          {t("featuresOverview.backToHome")}
        </Link>
      </div>
    </div>
  );
}
