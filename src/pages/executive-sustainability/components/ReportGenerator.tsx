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
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  const createdAt = new Date(report.createdAt).toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  });

  // En-tête avec fond coloré
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, pageWidth, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Plateforme Énergétique", pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(14);
  doc.text(reportTypeLabels[report.type], pageWidth / 2, 25, { align: "center" });

  // Retour au texte noir
  doc.setTextColor(0, 0, 0);
  
  // Informations du rapport
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Généré le : ${createdAt}`, 14, 45);
  doc.text(`Format : PDF`, 14, 51);

  // Ligne de séparation
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 56, pageWidth - 14, 56);

  // Section : Résumé Exécutif
  let y = 65;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Résumé Exécutif", 14, y);
  
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const summaryLines = [
    "• Consommation totale : 2 847 kWh",
    "• Coût actuel : 427 €",
    "• Empreinte carbone : 1,42 tCO₂",
    "• Alertes actives : 7",
    "• Score d'efficacité : 87 %",
  ];

  summaryLines.forEach((line) => {
    doc.text(line, 18, y);
    y += 6;
  });

  // Section : Analyse Détaillée
  y += 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Analyse Détaillée", 14, y);
  
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const analysisText = [
    "Performance Énergétique :",
    "La consommation énergétique montre une tendance stable avec une légère",
    "amélioration de 3% par rapport à la période précédente. Les pics de",
    "consommation sont principalement observés entre 8h et 18h.",
    "",
    "Coûts et Économies :",
    "Les coûts énergétiques restent maîtrisés grâce aux optimisations mises",
    "en place. Une économie potentielle de 15% est identifiée sur les heures",
    "creuses.",
    "",
    "Impact Environnemental :",
    "L'empreinte carbone est en réduction de 8% grâce à l'utilisation accrue",
    "d'énergies renouvelables et à l'optimisation des processus.",
  ];

  analysisText.forEach((line) => {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, 18, y);
    y += 5;
  });

  // Section : Recommandations
  y += 10;
  if (y > pageHeight - 50) {
    doc.addPage();
    y = 20;
  }
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Recommandations", 14, y);
  
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const recommendations = [
    "1. Optimiser la consommation pendant les heures de pointe",
    "2. Augmenter la part d'énergies renouvelables à 40%",
    "3. Mettre en place un système de monitoring en temps réel",
    "4. Former les équipes aux bonnes pratiques énergétiques",
    "5. Planifier un audit énergétique complet au prochain trimestre",
  ];

  recommendations.forEach((line) => {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, 18, y);
    y += 6;
  });

  // Pied de page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} sur ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
    doc.text(
      "Plateforme Énergétique - Rapport confidentiel",
      14,
      pageHeight - 10
    );
  }

  // Note de démonstration
  doc.setPage(totalPages);
  doc.setFontSize(9);
  doc.setTextColor(200, 100, 0);
  const noteY = pageHeight - 20;
  doc.text(
    "⚠️ Ce rapport est une version démo générée côté navigateur (sans backend).",
    pageWidth / 2,
    noteY,
    { align: "center" }
  );

  // Téléchargement du PDF
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
      alert("Pour l'instant, seul le format PDF est supporté côté navigateur.");
      return;
    }

    setIsGenerating(true);

    // Simulation d'un délai de génération
    setTimeout(() => {
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

      // Génération du PDF
      try {
        createPdf(report);

        // Mise à jour de la liste locale (max 5)
        setRecentReports((prev) => [report, ...prev].slice(0, 5));

        alert(
          `${reportTypeLabels[reportType]} généré avec succès ! Le téléchargement devrait commencer automatiquement.`
        );
      } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
        alert("Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.");
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  };

  const handleDownloadAgain = (report: RecentReport) => {
    try {
      createPdf(report);
      alert("Téléchargement du rapport en cours...");
    } catch (error) {
      console.error("Erreur lors du téléchargement:", error);
      alert("Une erreur est survenue lors du téléchargement. Veuillez réessayer.");
    }
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
            disabled={isGenerating}
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
            disabled={isGenerating}
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
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
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
