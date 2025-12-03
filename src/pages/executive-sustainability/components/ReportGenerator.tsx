import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

type ReportType = "monthly" | "quarterly" | "yearly";
type ReportFormat = "pdf";

interface RecentReport {
  id: string;
  type: ReportType;
  createdAt: string; // ISO date
  fileName: string;
}

const STORAGE_KEY = "eap_recent_reports";

const reportTypeLabels: Record<ReportType, string> = {
  monthly: "Rapport Mensuel",
  quarterly: "Rapport Trimestriel",
  yearly: "Rapport Annuel",
};

function createPdf(report: RecentReport) {
  const doc = new jsPDF();

  const createdAt = new Date(report.createdAt).toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Plateforme Énergétique - " + reportTypeLabels[report.type], 14, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Généré le ${createdAt}`, 14, 30);
  doc.text("Format : PDF (généré côté navigateur)", 14, 37);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("Résumé indicatif (données factices pour la maquette) :", 14, 50);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const lines = [
    "• Consommation totale : 2 847 kWh",
    "• Coût actuel : 427 €",
    "• Empreinte carbone : 1,42 tCO₂",
    "• Alertes actives : 7",
    "• Score d’efficacité : 87 %",
  ];

  let y = 60;
  lines.forEach((line) => {
    doc.text(line, 18, y);
    y += 7;
  });

  doc.text(
    "⚠️ Ce rapport est une version démo générée côté navigateur (sans backend).",
    14,
    y + 10
  );

  doc.save(report.fileName);
}

export const ReportGenerator: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>("monthly");
  const [format, setFormat] = useState<ReportFormat>("pdf");
  const [isGenerating, setIsGenerating] = useState(false);
  const [recentReports, setRecentReports] = useState<RecentReport[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as RecentReport[]) : [];
    } catch {
      return [];
    }
  });

  // Sauvegarde dans localStorage dès que la liste change
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentReports));
  }, [recentReports]);

  const handleGenerate = () => {
    if (format !== "pdf") {
      alert("Pour l’instant, seul le format PDF est supporté côté navigateur.");
      return;
    }

    setIsGenerating(true);

    const now = new Date();
    const id =
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `rep-${now.getTime()}`) ?? `rep-${now.getTime()}`;

    const fileName = `${reportTypeLabels[reportType]
      .toLowerCase()
      .replace(/\s+/g, "-")}-${now.toISOString().slice(0, 10)}.pdf`;

    const report: RecentReport = {
      id,
      type: reportType,
      createdAt: now.toISOString(),
      fileName,
    };

    // Génération immédiate
    createPdf(report);

    // Mise à jour de la liste locale (max 5)
    setRecentReports((prev) => [report, ...prev].slice(0, 5));

    setIsGenerating(false);
    alert(
      `${reportTypeLabels[reportType]} généré avec succès au format PDF (téléchargement effectué).`
    );
  };

  const handleDownloadAgain = (report: RecentReport) => {
    createPdf(report);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Génération de Rapports</h2>
        <p className="text-sm text-muted-foreground">
          Rapports exécutifs automatisés – génération locale (front-end uniquement).
        </p>
      </div>

      {/* Formulaire de génération */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Type de rapport</label>
          <select
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            value={reportType}
            onChange={(e) => setReportType(e.target.value as ReportType)}
          >
            <option value="monthly">Rapport Mensuel</option>
            <option value="quarterly">Rapport Trimestriel</option>
            <option value="yearly">Rapport Annuel</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Format de sortie</label>
          <select
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            value={format}
            onChange={(e) => setFormat(e.target.value as ReportFormat)}
          >
            <option value="pdf">PDF</option>
          </select>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {isGenerating ? "Génération en cours..." : "Générer le rapport"}
        </button>
      </div>

      {/* Rapports récents (localStorage) */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold mb-3">Rapports récents</h3>
        {recentReports.length === 0 ? (
          <p className="text-xs text-muted-foreground">
            Aucun rapport généré pour le moment. Utilisez le bouton ci-dessus pour créer un
            premier rapport PDF.
          </p>
        ) : (
          <ul className="space-y-3">
            {recentReports.map((report) => (
              <li
                key={report.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2"
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {reportTypeLabels[report.type]} –{" "}
                    {new Date(report.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                  <p className="text-xs text-muted-foreground break-all">
                    {report.fileName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadAgain(report)}
                  className="text-xs font-medium text-primary hover:underline whitespace-nowrap"
                >
                  Télécharger
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;
