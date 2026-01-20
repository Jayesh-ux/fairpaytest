import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  FileText, 
  Shield, 
  Lock, 
  CheckCircle2,
  File,
  Trash2,
  Eye,
  Download
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: Date;
}

export default function VaultPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([
    { id: "1", name: "Credit_Card_Statement_Dec.pdf", size: "2.4 MB", type: "PDF", uploadedAt: new Date() },
    { id: "2", name: "Medical_Bill_Invoice.pdf", size: "1.1 MB", type: "PDF", uploadedAt: new Date() },
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In a real app, handle file upload here
  };

  const handleDelete = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <Layout>
      <section className="pt-28 lg:pt-36 pb-20 lg:pb-32 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Bank-Level Security
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Document <span className="gradient-text">Vault</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Securely store and manage all your financial documents in one encrypted space.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Security Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {[
                { icon: Lock, label: "256-bit AES Encryption" },
                { icon: Shield, label: "SOC 2 Compliant" },
                { icon: CheckCircle2, label: "FINRA Regulated" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm text-foreground"
                >
                  <badge.icon className="w-4 h-4 text-accent" />
                  {badge.label}
                </div>
              ))}
            </motion.div>

            {/* Upload Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`glass-card-strong rounded-2xl p-8 mb-8 transition-all ${
                isDragging ? "border-accent bg-accent/5" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {isDragging ? "Drop files here" : "Upload Documents"}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Drag and drop files here, or click to browse
                </p>
                <Button variant="accent" size="lg">
                  <Upload className="w-4 h-4 mr-2" />
                  Select Files
                </Button>
                <p className="text-xs text-muted-foreground mt-4">
                  Supported formats: PDF, JPG, PNG, DOCX • Max file size: 25MB
                </p>
              </div>
            </motion.div>

            {/* Uploaded Files */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-border">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-accent" />
                  Your Documents
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground">
                    {files.length} files
                  </span>
                </h3>
              </div>

              {files.length > 0 ? (
                <div className="divide-y divide-border">
                  {files.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                        <File className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {file.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {file.size} • {file.type}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(file.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No documents uploaded yet
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
