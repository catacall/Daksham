// Dashboard.tsx — Payload Admin Custom Dashboard (Server Component)
import React from "react";
import Link from "next/link";

// ── Stat Card ──────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  href: string;
  id: string;
}

function StatCard({ label, value, sub, accent = "#d4af37", href, id }: StatCardProps) {
  return (
    <Link href={href} className={`dash-stat dash-stat--${id}`} style={{ textDecoration: "none" }}>
      <p className="dash-stat__label">{label}</p>
      <p className="dash-stat__value" style={{ color: accent }}>{value}</p>
      {sub && <p className="dash-stat__sub">{sub}</p>}
    </Link>
  );
}

// ── Data Fetching ───────────────────────────────────
interface RecentEnquiry {
  id: string;
  name: string;
  phone: string;
  status: string;
  createdAt: string;
  projectTitle?: string | null;
}

interface DashboardData {
  totalEnquiries: number;
  newEnquiries: number;
  contactedEnquiries: number;
  wonEnquiries: number;
  ongoingProjects: number;
  deliveredProjects: number;
  recentEnquiries: RecentEnquiry[];
}

async function getDashboardData(): Promise<DashboardData> {
  const empty: DashboardData = {
    totalEnquiries: 0, newEnquiries: 0, contactedEnquiries: 0,
    wonEnquiries: 0, ongoingProjects: 0, deliveredProjects: 0, recentEnquiries: [],
  };

  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const [eRes, pRes] = await Promise.all([
      fetch(`${base}/api/admin-data/enquiries`, { cache: "no-store" }),
      fetch(`${base}/api/admin-data/projects`,  { cache: "no-store" }),
    ]);

    const eq = eRes.ok ? await eRes.json() : { docs: [], totalDocs: 0 };
    const pj = pRes.ok ? await pRes.json() : { docs: [] };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allE: RecentEnquiry[] = (eq.docs || []).map((e: any) => ({
      id: e.id,
      name: e.name || "—",
      phone: e.phone || "—",
      status: e.status || "new",
      createdAt: e.createdAt,
      projectTitle: e.projectInterestedIn?.title ?? null,
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allP: { status: string }[] = pj.docs || [];

    return {
      totalEnquiries:      eq.totalDocs ?? allE.length,
      newEnquiries:        allE.filter(e => e.status === "new").length,
      contactedEnquiries:  allE.filter(e => e.status === "contacted" || e.status === "meeting").length,
      wonEnquiries:        allE.filter(e => e.status === "closed").length,
      ongoingProjects:     allP.filter(p => p.status === "ongoing").length,
      deliveredProjects:   allP.filter(p => p.status === "delivered").length,
      recentEnquiries:     allE.slice(0, 10),
    };
  } catch {
    return empty;
  }
}

function fmtDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    }).format(new Date(iso));
  } catch { return iso; }
}

const STATUS: Record<string, { label: string; bg: string; fg: string }> = {
  new:        { label: "New Lead",        bg: "#fef9e7", fg: "#92600a" },
  no_answer:  { label: "No Answer",       bg: "#f0f4f8", fg: "#4a5a72" },
  contacted:  { label: "Contacted",       bg: "#e6f7f0", fg: "#065f46" },
  meeting:    { label: "Meeting Set",     bg: "#ede9fe", fg: "#5b21b6" },
  closed:     { label: "Won ✅",          bg: "#d1fae5", fg: "#065f46" },
  lost:       { label: "Not Interested",  bg: "#fef2f2", fg: "#991b1b" },
};

// ── Dashboard ───────────────────────────────────────
export default async function DashboardPage() {
  const d = await getDashboardData();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      {/* ── Scoped styles (no JS handlers needed) ── */}
      <style>{`
        .dash-wrap {
          padding: 32px 32px 64px;
          background: #f5f7fa;
          min-height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .dash-title { font-size: 28px; font-weight: 700; color: #0a1628; margin: 0 0 4px; letter-spacing: -0.02em; }
        .dash-sub   { font-size: 14px; color: #8a9bb5; margin: 0; }
        .dash-accent { color: #d4af37; font-weight: 600; }

        /* Stat cards */
        .dash-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 16px; margin: 28px 0; }
        .dash-stat {
          display: block;
          background: #fff;
          border: 1px solid #e0e8f0;
          border-radius: 12px;
          padding: 20px 20px 16px;
          border-top: 4px solid #d4af37;
          text-decoration: none;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        .dash-stat:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .dash-stat__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #8a9bb5; margin: 0 0 10px; }
        .dash-stat__value { font-size: 34px; font-weight: 700; margin: 0 0 4px; line-height: 1; }
        .dash-stat__sub   { font-size: 12px; color: #8a9bb5; margin: 0; }

        /* Quick actions */
        .dash-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; }
        .dash-btn {
          display: inline-block;
          border-radius: 8px;
          padding: 10px 20px;
          font-weight: 700;
          font-size: 13px;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: opacity 0.15s;
        }
        .dash-btn:hover { opacity: 0.85; }

        /* Table */
        .dash-table-wrap {
          background: #fff;
          border: 1px solid #e0e8f0;
          border-radius: 12px;
          overflow: hidden;
        }
        .dash-table-head {
          padding: 16px 24px;
          border-bottom: 1px solid #e0e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .dash-table-title { font-size: 16px; font-weight: 700; color: #0a1628; margin: 0; }
        .dash-table-link  { font-size: 12px; color: #d4af37; font-weight: 700; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th { padding: 10px 16px; text-align: left; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #8a9bb5; border-bottom: 1px solid #e0e8f0; background: #f8fafc; }
        td { padding: 12px 16px; border-bottom: 1px solid #f0f4f8; }
        tbody tr:hover td { background: #f5f8ff; }
        .dash-pill { border-radius: 999px; padding: 3px 10px; font-size: 11px; font-weight: 700; white-space: nowrap; }
        .dash-phone { color: #0a1628; text-decoration: none; font-weight: 500; }
        .dash-phone:hover { color: #d4af37; }
        .dash-open  { color: #d4af37; font-weight: 700; font-size: 12px; text-decoration: none; }
        .dash-open:hover { text-decoration: underline; }
        .dash-empty { padding: 48px 24px; text-align: center; color: #8a9bb5; }
      `}</style>

      <div className="dash-wrap">

        {/* Header */}
        <div style={{ marginBottom: 4 }}>
          <h1 className="dash-title">Good day 👋</h1>
          <p className="dash-sub">
            Daksham Developers — Admin &nbsp;·&nbsp;
            <span className="dash-accent">{today}</span>
          </p>
        </div>

        {/* Stat Cards */}
        <div className="dash-grid">
          <StatCard id="total"      label="Total Enquiries"  value={d.totalEnquiries}     sub="All time"            accent="#0a1628" href="/admin/collections/enquiries" />
          <StatCard id="new"        label="New Leads"        value={d.newEnquiries}        sub="Action needed"       accent="#f59e0b" href="/admin/collections/enquiries" />
          <StatCard id="progress"   label="In Progress"      value={d.contactedEnquiries}  sub="Contacted / Meeting" accent="#6366f1" href="/admin/collections/enquiries" />
          <StatCard id="won"        label="Bookings Won"     value={d.wonEnquiries}        sub="Closed"              accent="#10b981" href="/admin/collections/enquiries" />
          <StatCard id="ongoing"    label="Ongoing Projects" value={d.ongoingProjects}                               accent="#0a1628" href="/admin/collections/projects"  />
          <StatCard id="delivered"  label="Delivered"        value={d.deliveredProjects}                             accent="#d4af37" href="/admin/collections/projects"  />
        </div>

        {/* Quick Actions */}
        <div className="dash-actions">
          <Link href="/admin/collections/projects/create" className="dash-btn" style={{ background: "#0a1628", color: "#fff" }}>
            ➕ Add New Project
          </Link>
          <Link href="/admin/collections/enquiries" className="dash-btn" style={{ background: "#d4af37", color: "#0a1628" }}>
            📋 View All Enquiries
          </Link>
          <Link href="/admin/collections/media/create" className="dash-btn" style={{ background: "#fff", color: "#0a1628", border: "1px solid #e0e8f0" }}>
            🖼️ Upload Photos
          </Link>
        </div>

        {/* Recent Enquiries Table */}
        <div className="dash-table-wrap">
          <div className="dash-table-head">
            <h2 className="dash-table-title">Recent Enquiries</h2>
            <Link href="/admin/collections/enquiries" className="dash-table-link">View All →</Link>
          </div>

          {d.recentEnquiries.length === 0 ? (
            <div className="dash-empty">
              <p style={{ fontSize: 40, margin: "0 0 8px" }}>📭</p>
              <p style={{ fontWeight: 600, margin: "0 0 4px" }}>No enquiries yet</p>
              <p style={{ fontSize: 13, margin: 0 }}>When someone submits the contact form, they appear here.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Received</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {d.recentEnquiries.map((enq) => {
                    const s = STATUS[enq.status] ?? STATUS.new;
                    return (
                      <tr key={enq.id}>
                        <td style={{ fontWeight: 600, color: "#0a1628" }}>{enq.name}</td>
                        <td><a href={`tel:${enq.phone}`} className="dash-phone">{enq.phone}</a></td>
                        <td style={{ color: "#4a5a72" }}>{enq.projectTitle ?? "—"}</td>
                        <td>
                          <span className="dash-pill" style={{ background: s.bg, color: s.fg }}>{s.label}</span>
                        </td>
                        <td style={{ color: "#8a9bb5", fontSize: 12, whiteSpace: "nowrap" }}>{fmtDate(enq.createdAt)}</td>
                        <td>
                          <Link href={`/admin/collections/enquiries/${enq.id}`} className="dash-open">Open →</Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
