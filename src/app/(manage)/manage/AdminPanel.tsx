"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from "react";

// ─── Types ───────────────────────────────────────────────────
type ProjectStatus = "ongoing" | "delivered";
type EnqStatus =
  | "new"
  | "no_answer"
  | "contacted"
  | "meeting"
  | "closed"
  | "lost";

interface MediaDoc {
  id: string;
  url: string;
  filename?: string;
}

interface Highlight {
  id?: string;
  point: string;
}

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
  amenityPhotos?: MediaDoc[];
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
    const r = await fetch("/api/admin-data/projects", {
      credentials: "include",
      cache: "no-store",
    });
    if (!r.ok) return [];
    return (await r.json()).docs || [];
  },
  async createProject(data: Record<string, unknown>): Promise<Project | null> {
    const r = await fetch("/api/admin-data/projects", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) return null;
    return (await r.json()).doc || null;
  },
  async updateProject(
    id: string,
    data: Record<string, unknown>,
  ): Promise<boolean> {
    const r = await fetch(`/api/admin-data/projects/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return r.ok;
  },
  async deleteProject(id: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const r = await fetch(`/api/admin-data/projects/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        return { ok: false, error: data.error || `HTTP ${r.status}` };
      }
      return { ok: true };
    } catch (e: any) {
      console.error("Failed to delete project:", e);
      return { ok: false, error: e.message };
    }
  },
  async uploadMedia(file: File): Promise<MediaDoc | null> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("alt", file.name || "Project image");
    const r = await fetch("/api/admin-data/upload", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    if (!r.ok) {
      const body = await r.json().catch(() => ({}));
      console.error("[uploadMedia] failed:", r.status, body);
      return null;
    }
    const json = await r.json();
    return json.doc || null;
  },
  async getEnquiries(): Promise<Enquiry[]> {
    const r = await fetch("/api/admin-data/enquiries", {
      credentials: "include",
      cache: "no-store",
    });
    if (!r.ok) return [];
    return (await r.json()).docs || [];
  },
  async updateEnquiry(
    id: string,
    data: Record<string, unknown>,
  ): Promise<boolean> {
    const r = await fetch(`/api/enquiries/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return r.ok;
  },
  async deleteEnquiry(id: string): Promise<boolean> {
    try {
      const r = await fetch(`/api/admin-data/enquiries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      return r.ok;
    } catch (e) {
      console.error("Failed to delete enquiry:", e);
      return false;
    }
  },
  async getSettings(): Promise<any> {
    const r = await fetch("/api/globals/site-settings?depth=1", {
      credentials: "include",
      cache: "no-store",
    });
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
const ENQ_STATUS: Record<EnqStatus, { label: string; bg: string; fg: string }> =
  {
    new: { label: "New Lead", bg: "#fef9e7", fg: "#92600a" },
    no_answer: { label: "No Answer", bg: "#f0f4f8", fg: "#4a5a72" },
    contacted: { label: "Contacted", bg: "#dbeafe", fg: "#1e40af" },
    meeting: { label: "Meeting Set", bg: "#ede9fe", fg: "#5b21b6" },
    closed: { label: "✅ Won", bg: "#d1fae5", fg: "#065f46" },
    lost: { label: "Not Interested", bg: "#fef2f2", fg: "#991b1b" },
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

function EditModal({
  project,
  isNew,
  onClose,
  onSave,
  showNotification,
}: EditModalProps) {
  const [form, setForm] = useState<
    Partial<Project> & {
      coverImage?: MediaDoc | null;
      images?: MediaDoc[];
      amenityPhotos?: MediaDoc[];
      specifications?: Specification[];
    }
  >({
    title: project?.title || "",
    status: project?.status || "ongoing",
    location: project?.location || "",
    area: project?.area || "",
    priceRange: project?.priceRange || "",
    description: project?.description || "",
    reraNumber: project?.reraNumber || "",
    youtubeUrl: project?.youtubeUrl || "",
    completionDate: project?.completionDate
      ? project.completionDate.slice(0, 7)
      : "",
    coverImage: project?.coverImage || null,
    images: project?.images || [],
    amenityPhotos: project?.amenityPhotos || [],
    highlights: project?.highlights || [],
    specifications: project?.specifications || [],
  });
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingAmenity, setUploadingAmenity] = useState(false);
  const [newHighlight, setNewHighlight] = useState("");
  const [uploadingSpecIdx, setUploadingSpecIdx] = useState<number | null>(null);
  // Use a ref so the file-input onChange callback always reads the latest index,
  // avoiding the stale-closure problem with async setState.
  const uploadingSpecIdxRef = useRef<number | null>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const amenityRef = useRef<HTMLInputElement>(null);
  const specImageRef = useRef<HTMLInputElement>(null);

  const set = (key: string, val: unknown) =>
    setForm(f => ({ ...f, [key]: val }));

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    const media = await api.uploadMedia(file);
    if (media) {
      set("coverImage", media);
    } else {
      showNotification(
        "Cover photo upload failed. Check console for details.",
        "error",
      );
    }
    setUploadingCover(false);
    if (coverRef.current) coverRef.current.value = "";
  };

  const handleAmenityUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingAmenity(true);
    let failed = 0;
    for (const file of files) {
      const media = await api.uploadMedia(file);
      if (media) {
        setForm(f => ({
          ...f,
          amenityPhotos: [...(f.amenityPhotos || []), media],
        }));
      } else {
        failed++;
      }
    }
    if (failed > 0)
      showNotification(
        `${failed} amenity photo(s) failed to upload. Try again.`,
        "error",
      );
    setUploadingAmenity(false);
    if (amenityRef.current) amenityRef.current.value = "";
  };

  const removeAmenityPhoto = (id: string) => {
    setForm(f => ({
      ...f,
      amenityPhotos: (f.amenityPhotos || []).filter(img => img.id !== id),
    }));
  };

  const addHighlight = () => {
    if (!newHighlight.trim()) return;
    setForm(f => ({
      ...f,
      highlights: [...(f.highlights || []), { point: newHighlight.trim() }],
    }));
    setNewHighlight("");
  };

  const removeHighlight = (idx: number) => {
    setForm(f => ({
      ...f,
      highlights: (f.highlights || []).filter((_, i) => i !== idx),
    }));
  };

  const addSpecification = () => {
    setForm(f => ({
      ...f,
      specifications: [
        ...(f.specifications || []),
        { title: "", description: "", image: null },
      ],
    }));
  };

  const updateSpecification = (
    idx: number,
    field: keyof Specification,
    value: unknown,
  ) => {
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
      specifications: (f.specifications || []).filter((_, i) => i !== idx),
    }));
  };

  const triggerSpecImageUpload = (idx: number) => {
    // Write to both ref (for the callback) and state (for UI indicator).
    uploadingSpecIdxRef.current = idx;
    setUploadingSpecIdx(idx);
    specImageRef.current?.click();
  };

  const handleSpecImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    // Read from ref — guaranteed to be the latest value regardless of React
    // render cycles, unlike the state variable which may be stale here.
    const idx = uploadingSpecIdxRef.current;
    if (!file || idx === null) return;
    const media = await api.uploadMedia(file);
    if (media) {
      updateSpecification(idx, "image", media);
    }
    if (specImageRef.current) specImageRef.current.value = "";
    uploadingSpecIdxRef.current = null;
    setUploadingSpecIdx(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Helper: convert a MediaDoc id to a valid Payload relationship id.
      // Fallback url:-prefixed ids are not real DB rows — exclude them so
      // Payload doesn't silently drop the entire images array.
      const toRelId = (id: string): number | null => {
        const n = Number(id);
        return Number.isFinite(n) && n > 0 ? n : null;
      };

      const coverImageId = form.coverImage?.id
        ? toRelId(form.coverImage.id)
        : null;
      const amenityIds = (form.amenityPhotos || [])
        .map(img => toRelId(img.id))
        .filter((id): id is number => id !== null);

      const payload: Record<string, unknown> = {
        title: form.title || "",
        status: form.status || "ongoing",
        location: form.location || "",
        area: form.area || "",
        priceRange: form.priceRange || "",
        description: form.description || "",
        reraNumber: form.reraNumber || undefined,
        youtubeUrl: form.youtubeUrl || undefined,
        completionDate: form.completionDate
          ? form.completionDate + "-01"
          : undefined,
        coverImage: coverImageId,
        amenityPhotos: amenityIds,
        highlights: form.highlights || [],
        specifications: (form.specifications || []).map(spec => ({
          title: spec.title || "",
          description: spec.description || "",
          image: spec.image?.id ? toRelId(spec.image.id) : null,
        })),
        publishedAt: new Date().toISOString(),
      };

      let result: Project | null = null;
      if (isNew) {
        result = await api.createProject(payload);
      } else if (project) {
        const ok = await api.updateProject(project.id, payload);
        if (ok)
          result = {
            ...project,
            ...form,
            title: form.title || "",
            status: form.status || "ongoing",
            location: form.location || "",
            area: form.area || "",
            priceRange: form.priceRange || "",
          } as Project;
      }

      if (result) onSave(result);
      else showNotification("Failed to save. Please try again.", "error");
    } catch (err) {
      console.error("[handleSave] Unexpected error:", err);
      showNotification(
        "An unexpected error occurred. Please try again.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-border-light/50">
        {/* ── Header ── */}
        <div className="px-6 py-5 border-b border-border-light/20 flex items-center justify-between bg-navy shrink-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-0.5">
              {isNew ? "New Project" : "Edit Project"}
            </p>
            <h2 className="font-display text-lg font-bold text-white">
              {isNew ? "Add New Project" : project?.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all text-base"
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 bg-off-white">
          <div className="p-6 space-y-5">
            {/* Cover Photo */}
            <div className="bg-white rounded-2xl p-5 border border-border-light/60 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-3">
                Cover Photo
              </p>
              <div className="flex flex-wrap gap-3 mb-3">
                {IMG(form.coverImage) && (
                  <div className="relative group/img w-20 h-16 rounded-xl overflow-hidden border border-border-light shadow-xs shrink-0">
                    <img
                      src={IMG(form.coverImage)!}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => set("coverImage", null)}
                      className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {!IMG(form.coverImage) && (
                  <button
                    onClick={() => coverRef.current?.click()}
                    disabled={uploadingCover}
                    className="w-20 h-16 rounded-xl border-2 border-dashed border-border-light flex flex-col items-center justify-center text-muted hover:border-gold hover:text-gold transition-all shrink-0 text-xl font-light"
                  >
                    {uploadingCover ? (
                      <span className="text-xs font-bold">…</span>
                    ) : (
                      "＋"
                    )}
                  </button>
                )}
              </div>
              <p className="text-[11px] text-muted">
                {IMG(form.coverImage)
                  ? "Hover over image to remove."
                  : "Click ＋ to upload. Recommended: 1600×900px landscape"}
              </p>
              <input
                ref={coverRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverUpload}
              />
            </div>

            {/* Core Fields */}
            <div className="bg-white rounded-2xl p-5 border border-border-light/60 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-4">
                Project Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">
                    Project Name *
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all"
                    value={form.title || ""}
                    onChange={e => set("title", e.target.value)}
                    placeholder="e.g. Sai World City"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">
                    Status
                  </label>
                  <select
                    className="w-full px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all cursor-pointer"
                    value={form.status}
                    onChange={e => set("status", e.target.value)}
                  >
                    <option value="ongoing">🏗️ Ongoing</option>
                    <option value="delivered">✅ Delivered</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">
                    Location *
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all"
                    value={form.location || ""}
                    onChange={e => set("location", e.target.value)}
                    placeholder="e.g. Panvel, Navi Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">
                    Price Range
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all"
                    value={form.priceRange || ""}
                    onChange={e => set("priceRange", e.target.value)}
                    placeholder="e.g. ₹45L – ₹90L"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">
                    Unit Types
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all"
                    value={form.area || ""}
                    onChange={e => set("area", e.target.value)}
                    placeholder="e.g. 2, 3 & 4 BHK"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">
                    RERA Number
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all"
                    value={form.reraNumber || ""}
                    onChange={e => set("reraNumber", e.target.value)}
                    placeholder="P52100XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">
                    Expected Completion
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all"
                    type="month"
                    value={form.completionDate || ""}
                    onChange={e => set("completionDate", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-navy mb-1.5">
                    YouTube Video Link
                  </label>
                  <input
                    className="w-full px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all"
                    value={form.youtubeUrl || ""}
                    onChange={e => set("youtubeUrl", e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 border border-border-light/60 shadow-xs">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-3">
                Description
              </label>
              <textarea
                className="w-full px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all resize-none"
                rows={4}
                value={form.description || ""}
                onChange={e => set("description", e.target.value)}
                placeholder="Provide a short luxury description about this project…"
              />
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-5 border border-border-light/60 shadow-xs">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-3">
                Highlights &amp; Features
              </label>
              <div className="flex flex-wrap gap-2 mb-3 min-h-[28px]">
                {(form.highlights || []).map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/30 text-navy rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    {h.point}
                    <button
                      onClick={() => removeHighlight(i)}
                      className="text-navy/40 hover:text-red-600 font-bold leading-none transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  className="flex-1 px-3.5 py-2.5 bg-off-white border border-border-light rounded-xl text-sm text-navy outline-none focus:border-gold focus:bg-white transition-all"
                  value={newHighlight}
                  onChange={e => setNewHighlight(e.target.value)}
                  placeholder="e.g. Smart Home Automation"
                  onKeyDown={e =>
                    e.key === "Enter" && (e.preventDefault(), addHighlight())
                  }
                />
                <button
                  onClick={addHighlight}
                  className="bg-navy hover:bg-gold text-white hover:text-navy text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Amenity Photos */}
            <div className="bg-white rounded-2xl p-5 border border-border-light/60 shadow-xs">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Amenity Photos
                  </p>
                  <p className="text-[11px] text-muted mt-0.5">
                    Pool, gym, lobby, garden, living spaces — showcased on the
                    project page
                  </p>
                </div>
                <span className="text-[10px] bg-gold/10 border border-gold/30 text-gold font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ml-2">
                  Displayed on site
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mb-3">
                {(form.amenityPhotos || []).map(img => (
                  <div
                    key={img.id}
                    className="relative group/img w-20 h-16 rounded-xl overflow-hidden border border-gold/30 shadow-xs shrink-0"
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeAmenityPhoto(img.id)}
                      className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity font-bold text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => amenityRef.current?.click()}
                  disabled={uploadingAmenity}
                  className="w-20 h-16 rounded-xl border-2 border-dashed border-gold/40 flex flex-col items-center justify-center text-gold hover:border-gold hover:bg-gold/5 transition-all shrink-0 text-xl font-light"
                >
                  {uploadingAmenity ? (
                    <span className="text-xs font-bold">…</span>
                  ) : (
                    "＋"
                  )}
                </button>
              </div>
              <p className="text-[11px] text-muted">
                Hover over image to remove. Click ＋ to add more.
              </p>
              <input
                ref={amenityRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleAmenityUpload}
              />
            </div>
          </div>
        </div>

        {/* ── Footer — always pinned ── */}
        <div className="px-6 py-4 border-t border-border-light/60 bg-white flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="text-navy border border-border-light bg-off-white hover:bg-border-light text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gold hover:bg-gold-light text-navy font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-md shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
  const [tab, setTab] = useState<"projects" | "enquiries" | "settings">(
    "projects",
  );
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [expandedEnq, setExpandedEnq] = useState<string | null>(null);
  const [savingEnq, setSavingEnq] = useState<Record<string, boolean>>({});
  const [selectedEnqs, setSelectedEnqs] = useState<string[]>([]);
  const [deleteConfirmProject, setDeleteConfirmProject] =
    useState<Project | null>(null);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const [deleteProjectError, setDeleteProjectError] = useState<string | null>(
    null,
  );
  const [uploadingBrochure, setUploadingBrochure] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const brochureInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const exportToCSV = () => {
    if (enquiries.length === 0) return;
    const headers = [
      "Name",
      "Phone",
      "Email",
      "Project Interested In",
      "Status",
      "Received Date",
      "Message",
      "Notes",
    ];
    const rows = enquiries.map(e => [
      e.name,
      e.phone,
      e.email,
      e.projectInterestedIn?.title || "—",
      e.status,
      new Date(e.createdAt).toLocaleDateString("en-IN"),
      e.message.replace(/\n/g, " "),
      (e.notes || "").replace(/\n/g, " "),
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map(row =>
        row
          .map(val => {
            const cleanVal = String(val).replace(/"/g, '""');
            return `"${cleanVal}"`;
          })
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Daksham_Enquiries_${new Date().toISOString().split("T")[0]}.csv`,
    );
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
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleBrochureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
    setEnquiries(prev => prev.map(e => (e.id === id ? { ...e, status } : e)));
    setSavingEnq(s => ({ ...s, [id]: false }));
  };

  const handleProjectSaved = (saved: Project) => {
    setProjects(prev => {
      const idx = prev.findIndex(p => p.id === saved.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = saved;
        return next;
      }
      return [saved, ...prev];
    });
    setEditProject(null);
    setIsNewProject(false);
    showNotification("Project saved successfully.");
  };

  const handleDeleteProject = (p: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmProject(p);
    setDeleteProjectError(null);
    setIsDeletingProject(false);
  };

  const handleBulkDelete = async () => {
    const toDelete = [...selectedEnqs];
    const results = await Promise.all(
      toDelete.map(async id => {
        const ok = await api.deleteEnquiry(String(id));
        return { id: String(id), ok };
      }),
    );
    const failed = results.filter(r => !r.ok);
    const succeeded = results.filter(r => r.ok).map(r => r.id);

    if (succeeded.length > 0) {
      // Re-fetch from server — source of truth is always the DB
      const fresh = await api.getEnquiries();
      setEnquiries(fresh);
      setSelectedEnqs([]);
    }

    if (failed.length > 0) {
      showNotification(
        `Deleted ${succeeded.length}, failed ${failed.length}.`,
        "error",
      );
    } else {
      showNotification(`Successfully deleted ${succeeded.length} enquiries.`);
    }
  };

  const stats = {
    total: enquiries.length,
    newLeads: enquiries.filter(e => e.status === "new").length,
    inProgress: enquiries.filter(
      e => e.status === "contacted" || e.status === "meeting",
    ).length,
    won: enquiries.filter(e => e.status === "closed").length,
    ongoing: projects.filter(p => p.status === "ongoing").length,
    delivered: projects.filter(p => p.status === "delivered").length,
  };

  return (
    <div className="min-h-screen bg-off-white font-sans pb-16">
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-border-light">
            <h3 className="font-display font-bold text-navy text-xl mb-2">
              Delete Project?
            </h3>
            <p className="text-sm text-black mb-4">
              Are you sure you want to delete{" "}
              <span className="font-bold">{deleteConfirmProject.title}</span>?
              This will permanently remove it from the website galleries.
            </p>

            {deleteProjectError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100">
                <strong className="block mb-1">Error Deleting:</strong>
                <span className="wrap-break-words">{deleteProjectError}</span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirmProject(null)}
                disabled={isDeletingProject}
                className="flex-1 bg-off-white hover:bg-border-light/30 text-navy font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const p = deleteConfirmProject;
                  if (!p) return;
                  const projectId = String(p.id);
                  setIsDeletingProject(true);
                  setDeleteProjectError(null);

                  const result = await api.deleteProject(projectId);

                  if (result.ok) {
                    // Re-fetch from server — source of truth is always the DB
                    const fresh = await api.getProjects();
                    setProjects(fresh);
                    showNotification(`"${p.title}" deleted successfully.`);
                    setDeleteConfirmProject(null);
                    setIsDeletingProject(false);
                  } else {
                    setDeleteProjectError(
                      result.error ||
                        "Server returned an error. Check your network tab for details.",
                    );
                    setIsDeletingProject(false);
                  }
                }}
                disabled={isDeletingProject}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-xs disabled:opacity-50 flex items-center justify-center"
              >
                {isDeletingProject ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Outer wrapper ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Title block & Quick Links (no giant header box) ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border-light/80 pb-5 mb-8">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-navy">
              Manage Console
            </h1>
            <p className="text-xs text-black mt-1 uppercase tracking-widest font-semibold">
              Daksham Developers — Admin Portal
            </p>
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
          {loading
            ? /* Skeleton cards while data loads */
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 border-t-4 border-border-light/40 shadow-xs animate-pulse"
                >
                  <div className="h-2.5 w-20 bg-border-light/60 rounded mb-3" />
                  <div className="h-7 w-10 bg-border-light/40 rounded" />
                </div>
              ))
            : [
                {
                  label: "Total Enquiries",
                  value: stats.total,
                  color: "text-navy",
                  border: "border-navy",
                },
                {
                  label: "New Leads",
                  value: stats.newLeads,
                  color: "text-amber-600",
                  border: "border-amber-500",
                },
                {
                  label: "In Progress",
                  value: stats.inProgress,
                  color: "text-indigo-600",
                  border: "border-indigo-500",
                },
                {
                  label: "Won / Closed",
                  value: stats.won,
                  color: "text-emerald-600",
                  border: "border-emerald-500",
                },
                {
                  label: "Ongoing",
                  value: stats.ongoing,
                  color: "text-cyan-600",
                  border: "border-cyan",
                },
                {
                  label: "Delivered",
                  value: stats.delivered,
                  color: "text-gold",
                  border: "border-gold",
                },
              ].map(s => (
                <div
                  key={s.label}
                  className={`bg-white rounded-2xl p-4 border-t-4 ${s.border} shadow-xs transition-transform hover:-translate-y-0.5 duration-200`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-black mb-1">
                    {s.label}
                  </p>
                  <p
                    className={`text-2xl font-display font-extrabold ${s.color}`}
                  >
                    {s.value}
                  </p>
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
                    : "text-black hover:text-navy hover:bg-border-light/20"
                }`}
              >
                {t === "projects"
                  ? loading
                    ? "🏗️ Projects"
                    : `🏗️ Projects (${projects.length})`
                  : t === "enquiries"
                    ? loading
                      ? "📋 Enquiries"
                      : `📋 Enquiries (${enquiries.length})`
                    : "⚙️ Settings"}
              </button>
            ))}
          </div>

          {tab === "projects" && (
            <button
              onClick={() => {
                setIsNewProject(true);
                setEditProject(null);
              }}
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
            {loading ? (
              /* Skeleton grid while projects load */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl overflow-hidden border border-border-light/60 shadow-xs flex flex-col"
                  >
                    <div className="h-56 bg-border-light/30" />
                    <div className="p-6 space-y-3 flex-1">
                      <div className="h-5 bg-border-light/40 rounded w-3/4" />
                      <div className="h-3 bg-border-light/30 rounded w-1/2" />
                      <div className="h-px bg-border-light/40 mt-4" />
                      <div className="flex gap-2 pt-2">
                        <div className="flex-1 h-10 bg-border-light/30 rounded-2xl" />
                        <div className="w-20 h-10 bg-border-light/20 rounded-2xl" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-border-light/50 shadow-xs space-y-2">
                <span className="text-5xl block">🏗️</span>
                <p className="font-bold text-navy">
                  No projects registered yet
                </p>
                <p className="text-xs text-black max-w-xs mx-auto">
                  Click "Add New Project" to insert custom project details.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(p => (
                  <div
                    key={p.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-border-light/60 hover:border-gold/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    {/* Image and status cover */}
                    <div className="relative h-56 bg-border-light/20 overflow-hidden">
                      {IMG(p.coverImage) ? (
                        <img
                          src={IMG(p.coverImage)!}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-black/50 gap-2">
                          <span className="text-4xl">🏗️</span>
                          <span className="text-xs font-semibold">
                            No Cover Photo
                          </span>
                        </div>
                      )}
                      <span
                        className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs ${
                          p.status === "delivered"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        {p.status === "delivered"
                          ? "✅ Delivered"
                          : "🏗️ Ongoing"}
                      </span>
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-display text-xl font-bold text-navy mb-2 group-hover:text-gold transition-colors duration-200">
                        {p.title}
                      </h3>
                      <div className="flex items-center text-xs text-black mb-4 font-medium">
                        <span className="mr-1">📍</span>
                        <span className="truncate">{p.location}</span>
                      </div>

                      <div className="flex justify-between items-center text-xs text-black/80 pt-4 border-t border-border-light/50 mt-auto">
                        <span>{p.area || "No Config"}</span>
                        <span className="font-bold text-navy">
                          {p.priceRange || "Price on Request"}
                        </span>
                      </div>

                      <div className="mt-5 flex gap-2">
                        <button
                          onClick={() => {
                            setEditProject(p);
                            setIsNewProject(false);
                          }}
                          className="flex-2 inline-flex items-center justify-center gap-1.5 bg-navy hover:bg-gold text-white hover:text-navy font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl transition-all duration-200"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirmProject(p)}
                          title="Delete Project"
                          className="flex-1 inline-flex items-center justify-center bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider px-2 py-3.5 rounded-2xl transition-all duration-200"
                        >
                          🗑️ Delete
                        </button>
                      </div>
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
                <span className="text-xs text-red-800 font-bold">
                  {selectedEnqs.length} lead(s) selected
                </span>
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

            {loading ? (
              /* Skeleton table rows while enquiries load */
              <div className="bg-white rounded-3xl border border-border-light/60 shadow-xs overflow-hidden animate-pulse">
                <div className="h-12 bg-off-white border-b border-border-light/60" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-6 py-4 border-b border-border-light/20"
                  >
                    <div className="w-4 h-4 rounded bg-border-light/40 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 bg-border-light/40 rounded w-32" />
                      <div className="h-2.5 bg-border-light/30 rounded w-24" />
                    </div>
                    <div className="h-3 bg-border-light/30 rounded w-28 hidden md:block" />
                    <div className="h-3 bg-border-light/30 rounded w-36 hidden md:block" />
                    <div className="h-7 bg-border-light/30 rounded-full w-24 hidden lg:block" />
                    <div className="h-3 bg-border-light/20 rounded w-20 hidden xl:block" />
                  </div>
                ))}
              </div>
            ) : enquiries.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-border-light/50 shadow-xs space-y-2">
                <span className="text-5xl block">📭</span>
                <p className="font-bold text-navy">No enquiries received yet</p>
                <p className="text-xs text-black max-w-xs mx-auto">
                  When clients submit enquiry forms on the website, they will
                  appear here instantly.
                </p>
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
                            checked={
                              enquiries.length > 0 &&
                              selectedEnqs.length === enquiries.length
                            }
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedEnqs(
                                  enquiries.map(enq => String(enq.id)),
                                );
                              } else {
                                setSelectedEnqs([]);
                              }
                            }}
                            className="w-4 h-4 rounded border-border-light text-navy focus:ring-gold accent-gold cursor-pointer"
                          />
                        </th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black">
                          Client Details
                        </th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black">
                          Project Interested
                        </th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black">
                          Email
                        </th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black">
                          Status
                        </th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black">
                          Received Date
                        </th>
                        <th className="py-4 px-6 text-xs font-bold uppercase tracking-wider text-black w-24"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light/30">
                      {enquiries.map(enq => {
                        const st = ENQ_STATUS[enq.status] ?? ENQ_STATUS.new;
                        const expanded = expandedEnq === enq.id;
                        return (
                          <Fragment key={enq.id}>
                            <tr
                              onClick={() =>
                                setExpandedEnq(expanded ? null : enq.id)
                              }
                              className="group hover:bg-off-white/30 transition-colors cursor-pointer"
                            >
                              <td
                                className="py-4 px-6 w-12 text-center"
                                onClick={e => e.stopPropagation()}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedEnqs.includes(
                                    String(enq.id),
                                  )}
                                  onChange={() => {
                                    setSelectedEnqs(prev =>
                                      prev.includes(String(enq.id))
                                        ? prev.filter(
                                            id => id !== String(enq.id),
                                          )
                                        : [...prev, String(enq.id)],
                                    );
                                  }}
                                  className="w-4 h-4 rounded border-border-light text-navy focus:ring-gold accent-gold cursor-pointer"
                                />
                              </td>
                              <td className="py-4 px-6">
                                <div className="font-bold text-navy text-sm">
                                  {enq.name}
                                </div>
                                <a
                                  href={`tel:${enq.phone}`}
                                  onClick={e => e.stopPropagation()}
                                  className="text-xs text-gold hover:text-gold-light font-bold inline-flex items-center gap-1 mt-1 transition-colors"
                                >
                                  📞 {enq.phone}
                                </a>
                              </td>
                              <td className="py-4 px-6 text-sm text-navy/80">
                                {enq.projectInterestedIn?.title || "—"}
                              </td>
                              <td className="py-4 px-6 text-sm text-black">
                                {enq.email}
                              </td>
                              <td
                                className="py-4 px-6"
                                onClick={e => e.stopPropagation()}
                              >
                                <select
                                  value={enq.status}
                                  onChange={e =>
                                    handleStatusChange(
                                      enq.id,
                                      e.target.value as EnqStatus,
                                    )
                                  }
                                  disabled={savingEnq[enq.id]}
                                  style={{ background: st.bg, color: st.fg }}
                                  className="px-3.5 py-1.5 rounded-full text-xs font-bold border border-transparent focus:border-gold outline-none cursor-pointer transition-all shadow-xs"
                                >
                                  {Object.entries(ENQ_STATUS).map(([k, v]) => (
                                    <option key={k} value={k}>
                                      {v.label}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-4 px-6 text-xs text-black font-semibold whitespace-nowrap">
                                {new Date(enq.createdAt).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </td>
                              <td
                                className="py-4 px-6 text-right"
                                onClick={e => e.stopPropagation()}
                              >
                                <div className="flex justify-end gap-1">
                                  <button
                                    onClick={() =>
                                      setExpandedEnq(expanded ? null : enq.id)
                                    }
                                    className="p-2 text-black hover:text-navy rounded-xl transition-all text-sm font-bold"
                                  >
                                    {expanded ? "▲" : "▼"}
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {/* Nested expansion block */}
                            {expanded && (
                              <tr>
                                <td
                                  colSpan={7}
                                  className="bg-off-white/30 p-6 border-b border-border-light/40"
                                >
                                  <div>
                                    <span className="block text-[10px] font-bold uppercase tracking-wider text-black mb-2">
                                      Message Payload
                                    </span>
                                    <div className="bg-white rounded-2xl p-4 border border-border-light/40 text-sm text-navy leading-relaxed shadow-xs">
                                      {enq.message}
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
              {" "}
              <h2 className="text-sm font-bold text-navy uppercase tracking-wider mb-2 ">
                Website Brochure (E-Brochure PDF)
              </h2>
            </div>

            <div className="border-t border-border-light/60 pt-6">
              <div className="max-w-xl space-y-4">
                <div>
                  <p className="text-xs text-black mb-4">
                    Upload the PDF brochure that users will download when they
                    submit the brochure request form on the home page.
                  </p>
                </div>

                {loading ? (
                  /* Skeleton while settings load */
                  <div className="flex items-center gap-4 p-4 border border-border-light/60 rounded-2xl bg-off-white/20 animate-pulse">
                    <div className="w-12 h-12 rounded-xl bg-border-light/40 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 bg-border-light/40 rounded w-40" />
                      <div className="h-2.5 bg-border-light/30 rounded w-24" />
                    </div>
                    <div className="h-9 w-28 bg-border-light/30 rounded-xl" />
                  </div>
                ) : (
                  <div className="flex items-center gap-4 p-4 border border-border-light/60 rounded-2xl bg-off-white/20">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold text-2xl shrink-0">
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-navy truncate">
                        {settings?.brochure?.filename || "No brochure uploaded"}
                      </p>
                      <p className="text-xs text-black">
                        {settings?.brochure?.filesize
                          ? `${(settings.brochure.filesize / 1024 / 1024).toFixed(2)} MB`
                          : "Upload a PDF document"}
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
                        {uploadingBrochure ? "Uploading…" : "Upload new PDF"}
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
                )}
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
          onClose={() => {
            setEditProject(null);
            setIsNewProject(false);
          }}
          onSave={handleProjectSaved}
          showNotification={showNotification}
        />
      )}

      {/* ── Notification Banner ── */}
      {notification && (
        <div
          className={`fixed bottom-5 right-5 z-9999 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl border transition-all duration-300 animate-slide-in ${
            notification.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
          }`}
        >
          <span>{notification.type === "error" ? "⚠️" : "✨"}</span>
          <span className="text-xs font-bold uppercase tracking-wider">
            {notification.message}
          </span>
        </div>
      )}
    </div>
  );
}
