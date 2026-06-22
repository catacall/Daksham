"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from "react";

// ─── Types ───────────────────────────────────────────────────
type ProjectStatus = "ongoing" | "delivered";
type EnqStatus = "new" | "no_answer" | "contacted" | "meeting" | "closed" | "lost";

interface MediaDoc { id: string; url: string; filename?: string; }

interface Highlight { id?: string; point: string; }

interface Specification {
  title?: string;
  description?: string;
  image?: MediaDoc | null;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  status: ProjectStatus;
  location: string;
  area: string;
  priceRange: string;
  description?: string;
  reraNumber?: string;
  youtubeUrl?: string;
  completionDate?: string;
  coverImage?: MediaDoc | null;
  images?: MediaDoc[];
  highlights?: Highlight[];
  specifications?: Specification[];
}

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: EnqStatus;
  notes?: string;
  followUpDate?: string;
  createdAt: string;
  projectInterestedIn?: { title: string } | null;
}

// ─── API Helpers ─────────────────────────────────────────────
const api = {
  async getProjects(): Promise<Project[]> {
    const r = await fetch("/api/projects?limit=100&depth=2&pagination=false&sort=-publishedAt", { credentials: "include" });
    if (!r.ok) return [];
    return (await r.json()).docs || [];
  },
  async createProject(data: Record<string, unknown>): Promise<Project | null> {
    const r = await fetch("/api/projects", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!r.ok) return null;
    return (await r.json()).doc || null;
  },
  async updateProject(id: string, data: Record<string, unknown>): Promise<boolean> {
    const r = await fetch(`/api/projects/${id}`, { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return r.ok;
  },
  async uploadMedia(file: File): Promise<MediaDoc | null> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("alt", file.name || "Project image");
    const r = await fetch("/api/admin-data/upload", { method: "POST", credentials: "include", body: fd });
    if (!r.ok) return null;
    return (await r.json()).doc || null;
  },
  async getEnquiries(): Promise<Enquiry[]> {
    const r = await fetch("/api/enquiries?limit=100&depth=1&pagination=false&sort=-createdAt", { credentials: "include" });
    if (!r.ok) return [];
    return (await r.json()).docs || [];
  },
  async updateEnquiry(id: string, data: Record<string, unknown>): Promise<boolean> {
    const r = await fetch(`/api/enquiries/${id}`, { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    return r.ok;
  },
  async deleteEnquiry(id: string): Promise<boolean> {
    const r = await fetch(`/api/enquiries/${id}`, { method: "DELETE", credentials: "include" });
    return r.ok;
  },
  async getSettings(): Promise<any> {
    const r = await fetch("/api/globals/site-settings?depth=1", { credentials: "include" });
    if (!r.ok) return null;
    return await r.json();
  },
  async updateSettings(data: Record<string, unknown>): Promise<boolean> {
    const r = await fetch("/api/globals/site-settings", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return r.ok;
  },
};

// ─── Status Config ───────────────────────────────────────────
const ENQ_STATUS: Record<EnqStatus, { label: string; bg: string; fg: string }> = {
  new:       { label: "New Lead",       bg: "#fef9e7", fg: "#92600a" },
  no_answer: { label: "No Answer",      bg: "#f0f4f8", fg: "#4a5a72" },
  contacted: { label: "Contacted",      bg: "#dbeafe", fg: "#1e40af" },
  meeting:   { label: "Meeting Set",    bg: "#ede9fe", fg: "#5b21b6" },
  closed:    { label: "✅ Won",         bg: "#d1fae5", fg: "#065f46" },
  lost:      { label: "Not Interested", bg: "#fef2f2", fg: "#991b1b" },
};

const IMG = (m?: MediaDoc | null) => m?.url || null;

// ─── Edit Project Modal ───────────────────────────────────────
interface EditModalProps {
  project: Project | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (p: Project) => void;
  showNotification: (msg: string, type?: "success" | "error") => void;
}

function EditModal({ project, isNew, onClose, onSave, showNotification }: EditModalProps) {
  const [form, setForm] = useState<Partial<Project> & { coverImage?: MediaDoc | null; images?: MediaDoc[]; specifications?: Specification[] }>({
    title: project?.title || "",
    status: project?.status || "ongoing",
    location: project?.location || "",
    area: project?.area || "",
    priceRange: project?.priceRange || "",
    description: project?.description || "",
    reraNumber: project?.reraNumber || "",
    youtubeUrl: project?.youtubeUrl || "",
    completionDate: project?.completionDate ? project.completionDate.slice(0, 7) : "",
    coverImage: project?.coverImage || null,
    images: project?.images || [],
    highlights: project?.highlights || [],
    specifications: project?.specifications || [],
  });
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [newHighlight, setNewHighlight] = useState("");
  const [uploadingSpecIdx, setUploadingSpecIdx] = useState<number | null>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const specImageRef = useRef<HTMLInputElement>(null);

  const set = (key: string, val: unknown) => setForm(f => ({ ...f, [key]: val }));

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    const media = await api.uploadMedia(file);
    if (media) set("coverImage", media);
    setUploadingCover(false);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingGallery(true);
    for (const file of files) {
      const media = await api.uploadMedia(file);
      if (media) setForm(f => ({ ...f, images: [...(f.images || []), media] }));
    }
    setUploadingGallery(false);
  };

  const removeGalleryImage = (id: string) => {
    setForm(f => ({ ...f, images: (f.images || []).filter(img => img.id !== id) }));
  };

  const addHighlight = () => {
    if (!newHighlight.trim()) return;
    setForm(f => ({ ...f, highlights: [...(f.highlights || []), { point: newHighlight.trim() }] }));
    setNewHighlight("");
  };

  const removeHighlight = (idx: number) => {
    setForm(f => ({ ...f, highlights: (f.highlights || []).filter((_, i) => i !== idx) }));
  };

  const addSpecification = () => {
    setForm(f => ({
      ...f,
      specifications: [...(f.specifications || []), { title: "", description: "", image: null }]
    }));
  };

  const updateSpecification = (idx: number, field: keyof Specification, value: unknown) => {
    setForm(f => {
      const nextSpecs = [...(f.specifications || [])];
      if (nextSpecs[idx]) {
        nextSpecs[idx] = { ...nextSpecs[idx], [field]: value };
      }
      return { ...f, specifications: nextSpecs };
    });
  };

  const removeSpecification = (idx: number) => {
    setForm(f => ({
      ...f,
      specifications: (f.specifications || []).filter((_, i) => i !== idx)
    }));
  };

  const triggerSpecImageUpload = (idx: number) => {
    setUploadingSpecIdx(idx);
    specImageRef.current?.click();
  };

  const handleSpecImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || uploadingSpecIdx === null) return;
    const media = await api.uploadMedia(file);
    if (media) {
      updateSpecification(uploadingSpecIdx, "image", media);
    }
    if (specImageRef.current) specImageRef.current.value = "";
    setUploadingSpecIdx(null);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload: Record<string, unknown> = {
      title: form.title || "",
      status: form.status || "ongoing",
      location: form.location || "",
      area: form.area || "",
      priceRange: form.priceRange || "",
      description: form.description || "",
      reraNumber: form.reraNumber || undefined,
      youtubeUrl: form.youtubeUrl || undefined,
      completionDate: form.completionDate ? form.completionDate + "-01" : undefined,
      coverImage: form.coverImage?.id || null,
      images: (form.images || []).map(img => img.id),
      highlights: form.highlights || [],
      specifications: (form.specifications || []).map(spec => ({
        title: spec.title || "",
        description: spec.description || "",
        image: spec.image?.id || null,
      })),
      publishedAt: new Date().toISOString(),
    };

    let result: Project | null = null;
    if (isNew) {
      result = await api.createProject(payload);
    } else if (project) {
      const ok = await api.updateProject(project.id, payload);
      if (ok) result = { ...project, ...form, title: form.title || "", status: form.status || "ongoing", location: form.location || "", area: form.area || "", priceRange: form.priceRange || "" } as Project;
    }
    setSaving(false);
    if (result) onSave(result);
    else showNotification("Failed to save. Please try again.", "error");
  };

  return (
    <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-border-light/50">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-border-light/60 flex items-center justify-between bg-white">
          <h2 className="font-display text-xl font-bold text-navy">
            {isNew ? "Add New Project" : `Edit: ${project?.title}`}
          </h2>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full border border-border-light/40 flex items-center justify-center text-muted hover:text-navy hover:bg-off-white transition-all text-xl"
          >
            x
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white">
          
          {/* Cover Photo */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Cover Photo</label>
            <div className="flex items-center gap-4">
              <div className="w-28 h-20 rounded-xl overflow-hidden bg-off-white border border-border-light/60 shrink-0 flex items-center justify-center">
                {IMG(form.coverImage) ? (
                  <img src={IMG(form.coverImage)!} alt="cover" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">🏗️</span>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <button 
                  onClick={() => coverRef.current?.click()} 
                  disabled={uploadingCover} 
                  className="bg-white hover:bg-off-white text-navy border border-border-light text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all"
                >
                  {uploadingCover ? "Uploading…" : "Upload Cover Photo"}
                </button>
                <p className="text-[11px] text-muted">Recommended: Landscape photo of site (e.g. 1600x900px)</p>
              </div>
              <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </div>
          </div>

          {/* Core Info Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Project Name *</label>
              <input 
                className="w-full px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                value={form.title || ""} 
                onChange={e => set("title", e.target.value)} 
                placeholder="e.g. Sai World City" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Status</label>
              <select 
                className="w-full px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all cursor-pointer"
                value={form.status} 
                onChange={e => set("status", e.target.value)}
              >
                <option value="ongoing">🏗️ Ongoing</option>
                <option value="delivered">✅ Delivered</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Location *</label>
              <input 
                className="w-full px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                value={form.location || ""} 
                onChange={e => set("location", e.target.value)} 
                placeholder="e.g. Panvel, Navi Mumbai" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Price Range</label>
              <input 
                className="w-full px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                value={form.priceRange || ""} 
                onChange={e => set("priceRange", e.target.value)} 
                placeholder="e.g. ₹45L – ₹90L" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Unit Types</label>
              <input 
                className="w-full px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                value={form.area || ""} 
                onChange={e => set("area", e.target.value)} 
                placeholder="e.g. 2, 3 & 4 BHK" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">RERA Number</label>
              <input 
                className="w-full px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                value={form.reraNumber || ""} 
                onChange={e => set("reraNumber", e.target.value)} 
                placeholder="P52100XXXXX" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Expected Completion</label>
              <input 
                className="w-full px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                type="month" 
                value={form.completionDate || ""} 
                onChange={e => set("completionDate", e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">YouTube Video Link</label>
              <input 
                className="w-full px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                value={form.youtubeUrl || ""} 
                onChange={e => set("youtubeUrl", e.target.value)} 
                placeholder="https://youtube.com/watch?v=..." 
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Description</label>
            <textarea 
              className="w-full px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all resize-none"
              rows={3} 
              value={form.description || ""} 
              onChange={e => set("description", e.target.value)} 
              placeholder="Provide a short luxury description about this project…" 
            />
          </div>

          {/* Highlights / Tags */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Highlights & Features</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {(form.highlights || []).map((h, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {h.point}
                  <button 
                    onClick={() => removeHighlight(i)} 
                    className="text-amber-600 hover:text-amber-900 font-bold ml-0.5 text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                className="flex-1 px-4 py-3 bg-white border border-border-light/80 rounded-xl text-sm text-navy outline-none focus:border-gold transition-all"
                value={newHighlight} 
                onChange={e => setNewHighlight(e.target.value)} 
                placeholder="Add feature e.g. Smart Home Automation" 
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addHighlight())}
              />
              <button 
                onClick={addHighlight} 
                className="bg-white hover:bg-off-white text-navy border border-border-light text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all"
              >
                Add
              </button>
            </div>
          </div>

          {/* Gallery Manager */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Gallery Photos</label>
            <div className="flex flex-wrap gap-3 mb-2">
              {(form.images || []).map(img => (
                <div key={img.id} className="relative group/img w-20 h-16 rounded-xl overflow-hidden border border-border-light/60 shadow-xs flex shrink-0">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeGalleryImage(img.id)} 
                    className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity font-bold text-xs"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                onClick={() => galleryRef.current?.click()} 
                disabled={uploadingGallery} 
                className="w-20 h-16 border-2 border-dashed border-border-light/80 hover:border-gold rounded-xl flex items-center justify-center text-muted hover:text-gold transition-all bg-off-white/40  shrink-0"
              >
                {uploadingGallery ? (
                  <span className="w-4 h-4 border-2 border-muted border-t-transparent animate-spin rounded-full" />
                ) : (
                  <span className="text-xl font-bold">+</span>
                )}
              </button>
              <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
            </div>
            <p className="text-[11px] text-muted">Hover image to remove. Select multiple files to upload gallery pictures.</p>
          </div>

          {/* Specifications & Interior Photos */}
          <div className="border-t border-border-light/60 pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted">Specifications & Interior Photos</label>
                <p className="text-[11px] text-muted">Detail specifications (e.g. Living Room, Kitchen) and add corresponding interior images.</p>
              </div>
              <button 
                type="button"
                onClick={addSpecification}
                className="bg-white hover:bg-off-white text-navy border border-border-light text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all"
              >
                + Add Specification
              </button>
            </div>

            <div className="space-y-4">
              {(form.specifications || []).map((spec, idx) => (
                <div key={idx} className="p-4 border border-border-light/60 rounded-2xl bg-off-white/20 space-y-3 relative group">
                  <button
                    type="button"
                    onClick={() => removeSpecification(idx)}
                    className="absolute top-2 right-2 text-muted hover:text-red-600 font-bold text-lg p-1 transition-all"
                    title="Remove Specification"
                  >
                    ×
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Specification image section */}
                    <div className="md:col-span-1 flex flex-col items-center justify-center border border-dashed border-border-light/80 rounded-xl p-3 bg-white min-h-[120px]">
                      {spec.image ? (
                        <div className="relative w-full h-24 rounded-lg overflow-hidden group/img">
                          <img src={spec.image.url} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => updateSpecification(idx, "image", null)}
                            className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity font-bold text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => triggerSpecImageUpload(idx)}
                          className="text-xs text-muted hover:text-gold font-bold flex flex-col items-center gap-1 transition-all"
                        >
                          <span className="text-xl">📸</span>
                          <span>Upload Photo</span>
                        </button>
                      )}
                    </div>

                    {/* Specification fields section */}
                    <div className="md:col-span-2 space-y-2">
                      <input
                        className="w-full px-3 py-2 bg-white border border-border-light/80 rounded-lg text-sm text-navy outline-none focus:border-gold transition-all"
                        value={spec.title || ""}
                        onChange={e => updateSpecification(idx, "title", e.target.value)}
                        placeholder="Specification Title (e.g. Living Room)"
                      />
                      <textarea
                        className="w-full px-3 py-2 bg-white border border-border-light/80 rounded-lg text-sm text-navy outline-none focus:border-gold transition-all resize-none"
                        rows={2}
                        value={spec.description || ""}
                        onChange={e => updateSpecification(idx, "description", e.target.value)}
                        placeholder="Specification description details..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Hidden file input for specification images */}
            <input 
              ref={specImageRef} 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleSpecImageUpload} 
            />
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border-light/60 bg-off-white/30 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="bg-white hover:bg-off-white text-navy border border-border-light text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="bg-gold hover:bg-gold-light text-navy font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm shadow-gold/10"
          >
            {saving ? "Saving…" : isNew ? "Create Project" : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────
export default function AdminPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"projects" | "enquiries" | "settings">("projects");
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [expandedEnq, setExpandedEnq] = useState<string | null>(null);
  const [enqNotes, setEnqNotes] = useState<Record<string, string>>({});
  const [savingEnq, setSavingEnq] = useState<Record<string, boolean>>({});
  const [selectedEnqs, setSelectedEnqs] = useState<string[]>([]);
  const [uploadingBrochure, setUploadingBrochure] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const brochureInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSingleDelete = async (id: string) => {
    const ok = await api.deleteEnquiry(id);
    if (ok) {
      setEnquiries(prev => prev.filter(e => e.id !== id));
      setSelectedEnqs(prev => prev.filter(x => x !== id));
      showNotification("Enquiry deleted successfully");
    } else {
      showNotification("Failed to delete enquiry.", "error");
    }
  };

  const handleBulkDelete = async () => {
    const results = await Promise.all(selectedEnqs.map(async id => {
      const ok = await api.deleteEnquiry(id);
      return { id, ok };
    }));
    const failed = results.filter(r => !r.ok);
    const succeeded = results.filter(r => r.ok).map(r => r.id);
    setEnquiries(prev => prev.filter(e => !succeeded.includes(e.id)));
    setSelectedEnqs(prev => prev.filter(x => !succeeded.includes(x)));

    if (failed.length > 0) {
      showNotification(`Failed to delete ${failed.length} enquiries.`, "error");
    } else {
      showNotification(`Successfully deleted ${succeeded.length} enquiries.`);
    }
  };

  const exportToCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ["Name", "Phone", "Email", "Project Interested In", "Status", "Received Date", "Message", "Notes"];
    const rows = enquiries.map(e => [
      e.name,
      e.phone,
      e.email,
      e.projectInterestedIn?.title || "—",
      e.status,
      new Date(e.createdAt).toLocaleDateString("en-IN"),
      e.message.replace(/\n/g, " "),
      (e.notes || "").replace(/\n/g, " ")
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map(row => 
        row.map(val => {
          const cleanVal = String(val).replace(/"/g, '""');
          return `"${cleanVal}"`;
        }).join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Daksham_Enquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [p, e, s] = await Promise.all([
      api.getProjects(),
      api.getEnquiries(),
      api.getSettings(),
    ]);
    setProjects(p);
    setEnquiries(e);
    setSettings(s);
    const notes: Record<string, string> = {};
    e.forEach(enq => { notes[enq.id] = enq.notes || ""; });
    setEnqNotes(notes);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleBrochureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBrochure(true);
    const media = await api.uploadMedia(file);
    if (media) {
      const ok = await api.updateSettings({
        brochure: media.id,
      });
      if (ok) {
        setSettings((prev: any) => ({
          ...prev,
          brochure: media,
        }));
        showNotification("Website brochure updated successfully.");
      } else {
        showNotification("Failed to update website settings.", "error");
      }
    } else {
      showNotification("Brochure upload failed. Please try again.", "error");
    }
    if (brochureInputRef.current) brochureInputRef.current.value = "";
    setUploadingBrochure(false);
  };

  const handleStatusChange = async (id: string, status: EnqStatus) => {
    setSavingEnq(s => ({ ...s, [id]: true }));
    await api.updateEnquiry(id, { status });
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    setSavingEnq(s => ({ ...s, [id]: false }));
  };

  const handleSaveNotes = async (id: string) => {
    setSavingEnq(s => ({ ...s, [id]: true }));
    await api.updateEnquiry(id, { notes: enqNotes[id] });
    setSavingEnq(s => ({ ...s, [id]: false }));
  };

  const handleProjectSaved = (saved: Project) => {
    setProjects(prev => {
      const idx = prev.findIndex(p => p.id === saved.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = saved; return next; }
      return [saved, ...prev];
    });
    setEditProject(null);
    setIsNewProject(false);
    showNotification("Project saved successfully.");
  };

  const stats = {
    total: enquiries.length,
    newLeads: enquiries.filter(e => e.status === "new").length,
    inProgress: enquiries.filter(e => e.status === "contacted" || e.status === "meeting").length,
    won: enquiries.filter(e => e.status === "closed").length,
    ongoing: projects.filter(p => p.status === "ongoing").length,
    delivered: projects.filter(p => p.status === "delivered").length,
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-off-white">
      <div className="text-center space-y-3">
        <div className="text-5xl animate-bounce">⏳</div>
        <p className="text-muted text-sm font-semibold tracking-wide">Loading manage dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-off-white font-sans pb-16">
      
      {/* ── Outer wrapper ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ── Title block & Quick Links (no giant header box) ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border-light/80 pb-5 mb-8">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy">Manage Console</h1>
            <p className="text-xs text-muted mt-1 uppercase tracking-widest font-semibold">Daksham Developers — Admin Portal</p>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy hover:text-gold border border-border-light hover:border-gold px-4 py-2.5 rounded-xl bg-white shadow-xs transition-all"
            >
              View Website
            </a>
          </div>
        </div>

        {/* ── Stats Grid (neat & compact) ── */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Total Enquiries", value: stats.total, color: "text-navy", border: "border-navy" },
            { label: "New Leads", value: stats.newLeads, color: "text-amber-600", border: "border-amber-500" },
            { label: "In Progress", value: stats.inProgress, color: "text-indigo-600", border: "border-indigo-500" },
            { label: "Won / Closed", value: stats.won, color: "text-emerald-600", border: "border-emerald-500" },
            { label: "Ongoing", value: stats.ongoing, color: "text-cyan-600", border: "border-cyan" },
            { label: "Delivered", value: stats.delivered, color: "text-gold", border: "border-gold" },
          ].map(s => (
            <div key={s.label} className={`bg-white rounded-2xl p-4 border-t-4 ${s.border} shadow-xs transition-transform hover:-translate-y-0.5 duration-200`}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1">{s.label}</p>
              <p className={`text-2xl font-display font-extrabold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Tabs & Sub-Controls ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex bg-border-light/25 p-1 rounded-2xl border border-border-light/40">
            {(["projects", "enquiries", "settings"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all uppercase ${
                  tab === t
                    ? "bg-navy text-white shadow-xs"
                    : "text-muted hover:text-navy hover:bg-border-light/20"
                }`}
              >
                {t === "projects" 
                  ? `🏗️ Projects (${projects.length})` 
                  : t === "enquiries" 
                    ? `📋 Enquiries (${enquiries.length})` 
                    : "⚙️ Settings"
                }
              </button>
            ))}
          </div>

          {tab === "projects" && (
            <button
              onClick={() => { setIsNewProject(true); setEditProject(null); }}
              className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold-light text-navy font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl shadow-xs transition-all cursor-pointer"
            >
              ➕ Add New Project
            </button>
          )}

          {tab === "enquiries" && enquiries.length > 0 && (
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-off-white text-navy border border-border-light font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-2xl shadow-xs transition-all cursor-pointer"
            >
              📥 Export to CSV
            </button>
          )}
        </div>

        {/* ── PROJECTS TAB ── */}
        {tab === "projects" && (
          <div>
            {projects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-border-light/50 shadow-xs space-y-2">
                <span className="text-5xl block">🏗️</span>
                <p className="font-bold text-navy">No projects registered yet</p>
                <p className="text-xs text-muted max-w-xs mx-auto">Click "Add New Project" to insert custom project details.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                  <div key={p.id} className="group bg-white rounded-3xl overflow-hidden border border-border-light/60 hover:border-gold/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col">
                    
                    {/* Image and status cover */}
                    <div className="relative h-56 bg-border-light/20 overflow-hidden">
                      {IMG(p.coverImage) ? (
                        <img 
                          src={IMG(p.coverImage)!} 
                          alt={p.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-muted/50 gap-2">
                          <span className="text-4xl">🏗️</span>
                          <span className="text-xs font-semibold">No Cover Photo</span>
                        </div>
                      )}
                      <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs ${
                        p.status === "delivered"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {p.status === "delivered" ? "✅ Delivered" : "🏗️ Ongoing"}
                      </span>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors duration-200">
                        {p.title}
                      </h3>
                      <div className="flex items-center text-xs text-muted mb-4 font-medium">
                        <span className="mr-1">📍</span>
                        <span className="truncate">{p.location}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-muted/80 pt-4 border-t border-border-light/50 mt-auto">
                        <span>{p.area || "No Config"}</span>
                        <span className="font-bold text-navy">{p.priceRange || "Price on Request"}</span>
                      </div>

                      <button
                        onClick={() => { setEditProject(p); setIsNewProject(false); }}
                        className="mt-5 w-full inline-flex items-center justify-center gap-1.5 bg-navy hover:bg-gold text-white hover:text-navy font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl transition-all duration-200"
                      >
                        ✏️ Edit Project Details
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ENQUIRIES TAB ── */}
        {tab === "enquiries" && (
          <div>
            {/* Bulk actions */}
            {selectedEnqs.length > 0 && (
              <div className="flex items-center gap-2.5 mb-4 bg-red-50 border border-red-100 px-4 py-3 rounded-2xl">
                <span className="text-xs text-red-800 font-bold">{selectedEnqs.length} lead(s) selected</span>
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-xs"
                >
                  🗑️ Delete Selected
                </button>
                <button
                  onClick={() => setSelectedEnqs([])}
                  className="bg-white hover:bg-off-white text-navy border border-border-light text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition-all"
                >
                  Deselect All
                </button>
              </div>
            )}

            {enquiries.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-border-light/50 shadow-xs space-y-2">
                <span className="text-5xl block">📭</span>
                <p className="font-bold text-navy">No enquiries received yet</p>
                <p className="text-xs text-muted max-w-xs mx-auto">When clients submit enquiry forms on the website, they will appear here instantly.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-border-light/60 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-off-white border-b border-border-light/60">
                        <th className="py-4 px-6 w-12 text-center">
                          <input 
                            type="checkbox" 
                            checked={enquiries.length > 0 && selectedEnqs.length === enquiries.length}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedEnqs(enquiries.map(enq => enq.id));
                              } else {
                                setSelectedEnqs([]);
                              }
                            }}
                            className="w-4 h-4 rounded border-border-light text-navy focus:ring-gold accent-gold cursor-pointer"
                          />
                        </th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-muted">Client Details</th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-muted">Project Interested</th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-muted">Email</th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-muted">Status</th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-muted">Received Date</th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-muted w-24"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light/30">
                      {enquiries.map((enq) => {
                        const st = ENQ_STATUS[enq.status] ?? ENQ_STATUS.new;
                        const expanded = expandedEnq === enq.id;
                        return (
                          <Fragment key={enq.id}>
                            <tr 
                              onClick={() => setExpandedEnq(expanded ? null : enq.id)}
                              className="group hover:bg-off-white/30 transition-colors cursor-pointer"
                            >
                              <td className="py-4 px-6 w-12 text-center" onClick={e => e.stopPropagation()}>
                                <input 
                                  type="checkbox" 
                                  checked={selectedEnqs.includes(enq.id)}
                                  onChange={() => {
                                    setSelectedEnqs(prev => 
                                      prev.includes(enq.id) 
                                        ? prev.filter(id => id !== enq.id) 
                                        : [...prev, enq.id]
                                    );
                                  }}
                                  className="w-4 h-4 rounded border-border-light text-navy focus:ring-gold accent-gold cursor-pointer"
                                />
                              </td>
                              <td className="py-4 px-6">
                                <div className="font-bold text-navy text-sm">{enq.name}</div>
                                <a
                                  href={`tel:${enq.phone}`}
                                  onClick={e => e.stopPropagation()}
                                  className="text-xs text-gold hover:text-gold-light font-bold inline-flex items-center gap-1 mt-1 transition-colors"
                                >
                                  📞 {enq.phone}
                                </a>
                              </td>
                              <td className="py-4 px-6 text-sm text-navy/80">{enq.projectInterestedIn?.title || "—"}</td>
                              <td className="py-4 px-6 text-sm text-muted">{enq.email}</td>
                              <td className="py-4 px-6" onClick={e => e.stopPropagation()}>
                                <select
                                  value={enq.status}
                                  onChange={e => handleStatusChange(enq.id, e.target.value as EnqStatus)}
                                  disabled={savingEnq[enq.id]}
                                  style={{ background: st.bg, color: st.fg }}
                                  className="px-3.5 py-1.5 rounded-full text-xs font-bold border border-transparent focus:border-gold outline-none cursor-pointer transition-all shadow-xs"
                                >
                                  {Object.entries(ENQ_STATUS).map(([k, v]) => (
                                    <option key={k} value={k}>{v.label}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-4 px-6 text-xs text-muted font-semibold whitespace-nowrap">
                                {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric"
                                })}
                              </td>
                              <td className="py-4 px-6 text-right" onClick={e => e.stopPropagation()}>
                                <div className="flex justify-end gap-1">
                                  <button 
                                    onClick={() => setExpandedEnq(expanded ? null : enq.id)}
                                    className="p-2 text-muted hover:text-navy rounded-xl transition-all text-sm font-bold"
                                  >
                                    {expanded ? "▲" : "▼"}
                                  </button>
                                  <button 
                                    onClick={() => handleSingleDelete(enq.id)}
                                    title="Delete Lead"
                                    className="p-2 text-muted hover:text-red-600 rounded-xl transition-all text-sm font-bold"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                            
                            {/* Nested expansion block */}
                            {expanded && (
                              <tr>
                                <td colSpan={7} className="bg-off-white/30 p-6 border-b border-border-light/40">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Message Payload</span>
                                      <div className="bg-white rounded-2xl p-4 border border-border-light/40 text-sm text-navy leading-relaxed shadow-xs">
                                        {enq.message}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-2">Staff Notes (Editable)</span>
                                      <div className="flex flex-col gap-2">
                                        <textarea
                                          className="w-full bg-white border border-border-light/60 rounded-2xl p-4 text-sm text-navy outline-none focus:border-gold transition-all resize-none"
                                          rows={3}
                                          value={enqNotes[enq.id] || ""}
                                          onChange={e => setEnqNotes(n => ({ ...n, [enq.id]: e.target.value }))}
                                          placeholder="Write call logs, budget estimates, or follow-up details here..."
                                        />
                                        <button
                                          onClick={() => handleSaveNotes(enq.id)}
                                          disabled={savingEnq[enq.id]}
                                          className="self-end inline-flex items-center gap-1.5 bg-navy hover:bg-gold text-white hover:text-navy font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs transition-all"
                                        >
                                          {savingEnq[enq.id] ? "Saving..." : "Save Notes"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {tab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-light/60 shadow-xs space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-navy mb-1">Website Settings</h2>
              <p className="text-xs text-muted">Manage global settings, documents, and brochure downloads for the main website.</p>
            </div>

            <div className="border-t border-border-light/60 pt-6">
              <div className="max-w-xl space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-2">Website Brochure (E-Brochure PDF)</h3>
                  <p className="text-xs text-muted mb-4">Upload the PDF brochure that users will download when they submit the brochure request form on the home page.</p>
                </div>

                <div className="flex items-center gap-4 p-4 border border-border-light/60 rounded-2xl bg-off-white/20">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold text-2xl shrink-0">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy truncate">
                      {settings?.brochure?.filename || "No brochure uploaded"}
                    </p>
                    <p className="text-xs text-muted">
                      {settings?.brochure?.filesize 
                        ? `${(settings.brochure.filesize / 1024 / 1024).toFixed(2)} MB` 
                        : "Upload a PDF document"
                      }
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {settings?.brochure?.url && (
                      <a 
                        href={settings.brochure.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-bold text-navy hover:text-gold mr-2 transition-colors"
                      >
                        Preview
                      </a>
                    )}
                    <button
                      onClick={() => brochureInputRef.current?.click()}
                      disabled={uploadingBrochure}
                      className="bg-navy hover:bg-gold text-white hover:text-navy font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all"
                    >
                      {uploadingBrochure ? "Uploading…" : "Upload PDF"}
                    </button>
                    <input 
                      ref={brochureInputRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={handleBrochureUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ── Modal overlay ── */}
      {(editProject || isNewProject) && (
        <EditModal
          project={editProject}
          isNew={isNewProject}
          onClose={() => { setEditProject(null); setIsNewProject(false); }}
          onSave={handleProjectSaved}
          showNotification={showNotification}
        />
      )}

      {/* ── Notification Banner ── */}
      {notification && (
        <div className={`fixed bottom-5 right-5 z-9999 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl border transition-all duration-300 animate-slide-in ${
          notification.type === "error"
            ? "bg-red-50 border-red-200 text-red-800"
            : "bg-emerald-50 border-emerald-200 text-emerald-800"
        }`}>
          <span>{notification.type === "error" ? "⚠️" : "✨"}</span>
          <span className="text-xs font-bold uppercase tracking-wider">{notification.message}</span>
        </div>
      )}
    </div>
  );
}
