"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Lock,
  LogOut,
  ExternalLink,
  Settings,
  Briefcase,
  Search,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Edit3,
  GitBranch,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Key,
  Upload,
  ImageIcon,
} from "lucide-react";
import { ServiceData } from "@/lib/services";

interface SiteConfig {
  phone: string;
  phoneRaw: string;
  email: string;
  licenseNumber: string;
  licenseAuthority: string;
  hoursWeekdays: string;
  hoursSaturday: string;
  address: string;
  serviceAreasText: string;
  emergencyText: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active tab: 'services' | 'config'
  const [activeTab, setActiveTab] = useState<"services" | "config">("services");

  // Data states
  const [services, setServices] = useState<ServiceData[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Search & Filter
  const [serviceSearch, setServiceSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "residential" | "commercial">("all");

  // Service Edit Modal
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [isSavingService, setIsSavingService] = useState(false);
  const [serviceSaveSuccess, setServiceSaveSuccess] = useState(false);
  const [serviceSaveMsg, setServiceSaveMsg] = useState("");
  const [serviceSaveError, setServiceSaveError] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [imageUploadSuccess, setImageUploadSuccess] = useState("");

  // Site Config Saving
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [configSaveSuccess, setConfigSaveSuccess] = useState(false);
  const [configSaveMsg, setConfigSaveMsg] = useState("");
  const [configSaveError, setConfigSaveError] = useState("");

  // GitHub Sync Status
  const [gitStatus, setGitStatus] = useState<{
    mode: "api" | "local-cli" | "disconnected";
    repo: string;
    branch: string;
    hasToken: boolean;
    isLocalGit: boolean;
    message: string;
  } | null>(null);
  const [showGitHelp, setShowGitHelp] = useState(false);
  const [isCheckingGit, setIsCheckingGit] = useState(false);

  const fetchGitStatus = async () => {
    setIsCheckingGit(true);
    try {
      const res = await fetch("/api/admin/github-status");
      if (res.ok) {
        const data = await res.json();
        setGitStatus(data);
      }
    } catch (err) {
      console.error("Failed to check GitHub status:", err);
    } finally {
      setIsCheckingGit(false);
    }
  };

  const fetchAllData = React.useCallback(async () => {
    setLoadingData(true);
    try {
      const [servicesRes, configRes, gitRes] = await Promise.all([
        fetch("/api/admin/services"),
        fetch("/api/admin/site-config"),
        fetch("/api/admin/github-status"),
      ]);

      if (servicesRes.ok) {
        const sData = await servicesRes.json();
        setServices(sData.services || []);
      }
      if (configRes.ok) {
        const cData = await configRes.json();
        setConfig(cData.config || null);
      }
      if (gitRes.ok) {
        const gData = await gitRes.json();
        setGitStatus(gData);
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  // 1. Check auth status on mount
  useEffect(() => {
    let isMounted = true;
    async function initAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (!isMounted) return;
        setIsAuthenticated(data.authenticated);
        if (data.authenticated) {
          fetchAllData();
        }
      } catch {
        if (isMounted) setIsAuthenticated(false);
      }
    }
    initAuth();
    return () => {
      isMounted = false;
    };
  }, [fetchAllData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      setIsAuthenticated(true);
      fetchAllData();
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : "Incorrect password");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setPassword("");
  };



  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingService) return;

    if (file.size > 5 * 1024 * 1024) {
      setImageUploadError("File is too large. Maximum size is 5MB.");
      return;
    }

    setIsUploadingImage(true);
    setImageUploadError("");
    setImageUploadSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", editingService.slug);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      setEditingService({
        ...editingService,
        heroImage: data.url,
      });
      setImageUploadSuccess("New image uploaded to Git! Click Save Service below to publish.");
      fetchGitStatus();
    } catch (err: unknown) {
      setImageUploadError(err instanceof Error ? err.message : "Upload failed");
      console.error(err);
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  // Save Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setIsSavingService(true);
    setServiceSaveSuccess(false);
    setServiceSaveMsg("");
    setServiceSaveError("");

    try {
      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to commit service to GitHub");

      setServices((prev) =>
        prev.map((s) => (s.slug === editingService.slug ? editingService : s))
      );
      setServiceSaveSuccess(true);
      setServiceSaveMsg(data.gitSync?.message || "Service saved successfully!");
      fetchGitStatus();
      setTimeout(() => {
        setServiceSaveSuccess(false);
        setEditingService(null);
      }, 2500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving service";
      setServiceSaveError(msg);
      console.error(err);
    } finally {
      setIsSavingService(false);
    }
  };

  // Save Config
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setIsSavingConfig(true);
    setConfigSaveSuccess(false);
    setConfigSaveMsg("");
    setConfigSaveError("");

    try {
      const res = await fetch("/api/admin/site-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to commit settings to GitHub");

      setConfigSaveSuccess(true);
      setConfigSaveMsg(data.gitSync?.message || "Company settings saved successfully!");
      fetchGitStatus();
      setTimeout(() => setConfigSaveSuccess(false), 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error saving configuration";
      setConfigSaveError(msg);
      console.error(err);
    } finally {
      setIsSavingConfig(false);
    }
  };

  // Loading view
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
      </div>
    );
  }

  // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="text-center space-y-3 mb-8">
            <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Portal</h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Enter your master password to manage Naples Electrical services, settings, and leads.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Master Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm rounded-xl transition shadow-lg shadow-amber-400/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging In...</span>
                </>
              ) : (
                <span>Access Admin Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-amber-400 transition inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(serviceSearch.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-white text-sm sm:text-base">Naples Electrical</span>
              <span className="ml-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-400/15 text-amber-400 border border-amber-400/30">
                Admin CMS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5 transition border border-red-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 border-t border-slate-800/60 overflow-x-auto">
          {[
            { id: "services", label: "Services Manager", icon: Briefcase, count: services.length },
            { id: "config", label: "Company Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-3.5 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
                  active
                    ? "border-amber-400 text-amber-400"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      active ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadingData ? (
          <div className="py-20 text-center text-slate-500 flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <span className="text-sm">Loading CMS content...</span>
          </div>
        ) : (
          <>
            {/* ─── GITHUB SYNC STATUS BANNER ─── */}
            {gitStatus && (
              <div
                className={`mb-6 p-4 rounded-2xl border transition-all ${
                  gitStatus.mode === "api"
                    ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-200"
                    : gitStatus.mode === "local-cli"
                    ? "bg-blue-950/30 border-blue-500/30 text-blue-200"
                    : "bg-amber-950/30 border-amber-500/40 text-amber-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        gitStatus.mode === "api"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : gitStatus.mode === "local-cli"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      {gitStatus.mode === "api" ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : gitStatus.mode === "local-cli" ? (
                        <GitBranch className="w-5 h-5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-white text-sm">
                          {gitStatus.mode === "api"
                            ? "Live Cloud GitHub Commit Active"
                            : gitStatus.mode === "local-cli"
                            ? "Local Git Auto-Push Active (Development)"
                            : "Cloud Sync Disabled — GITHUB_TOKEN Missing"}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full ${
                            gitStatus.mode === "api"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : gitStatus.mode === "local-cli"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {gitStatus.repo} ({gitStatus.branch})
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {gitStatus.mode === "api"
                          ? "Every change saved here commits directly to GitHub and triggers automatic Vercel redeployment."
                          : gitStatus.mode === "local-cli"
                          ? "Running in local development. When you save, it runs local git commit & git push to origin main automatically."
                          : "Changes saved on Vercel cannot commit to GitHub until you add GITHUB_TOKEN in your Vercel project settings."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={fetchGitStatus}
                      disabled={isCheckingGit}
                      className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl text-xs transition"
                      title="Refresh Git connection status"
                    >
                      <RefreshCw className={`w-4 h-4 ${isCheckingGit ? "animate-spin" : ""}`} />
                    </button>
                    {gitStatus.mode === "disconnected" && (
                      <button
                        type="button"
                        onClick={() => setShowGitHelp(!showGitHelp)}
                        className="px-3 py-1.5 bg-amber-400 text-slate-950 font-black text-xs rounded-xl hover:bg-amber-300 transition flex items-center gap-1"
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>Setup Instructions</span>
                        {showGitHelp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>

                {showGitHelp && (
                  <div className="mt-4 pt-4 border-t border-amber-500/20 text-xs text-slate-200 space-y-2.5">
                    <p className="font-bold text-amber-300">
                      How to connect live Vercel deployments to GitHub in 2 minutes:
                    </p>
                    <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1">
                      <li>
                        Go to{" "}
                        <a
                          href="https://github.com/settings/tokens"
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-400 underline font-semibold"
                        >
                          GitHub Developer Settings → Personal Access Tokens (Classic)
                        </a>
                      </li>
                      <li>
                        Click <strong>Generate new token (classic)</strong>, name it <code>NaplesElectrical-CMS</code>, and check the <strong>repo</strong> box.
                      </li>
                      <li>
                        Open your project on <strong>Vercel Dashboard → Settings → Environment Variables</strong>.
                      </li>
                      <li>
                        Add <code>GITHUB_TOKEN</code> with your generated token value.
                      </li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            {/* ─── TAB 1: SERVICES MANAGER ─── */}
            {activeTab === "services" && (
              <div className="space-y-6">
                {/* Header Controls */}
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-3 flex-1 max-w-md">
                    <div className="relative w-full">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search services by keyword..."
                        value={serviceSearch}
                        onChange={(e) => setServiceSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Category:</span>
                    {(["all", "residential", "commercial"] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                          categoryFilter === cat
                            ? "bg-amber-400 text-slate-950"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredServices.map((service) => (
                    <div
                      key={service.slug}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition"
                    >
                      <div>
                        {/* Service hero preview */}
                        <div className="relative h-36 w-full bg-slate-950">
                          <Image
                            src={service.heroImage}
                            alt={service.title}
                            fill
                            className="object-cover opacity-85"
                          />
                          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 backdrop-blur text-[10px] font-black uppercase text-amber-400 border border-white/10">
                            {service.category}
                          </div>
                          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-slate-900/90 backdrop-blur text-[10px] font-bold text-slate-300 border border-white/10">
                            {service.faqs.length} FAQs
                          </div>
                        </div>

                        <div className="p-5 space-y-2">
                          <h3 className="font-extrabold text-base text-white leading-tight">
                            {service.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {service.tagline}
                          </p>
                          <div className="pt-2 flex flex-wrap gap-1.5">
                            {service.features.slice(0, 3).map((f, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded-md font-medium truncate max-w-[200px]"
                              >
                                {f}
                              </span>
                            ))}
                            {service.features.length > 3 && (
                              <span className="px-1.5 py-0.5 text-slate-500 text-[10px]">
                                +{service.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                        <Link
                          href={`/services/${service.slug}`}
                          target="_blank"
                          className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition"
                        >
                          <span>Preview</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => setEditingService(JSON.parse(JSON.stringify(service)))}
                          className="px-3.5 py-1.5 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/30 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Service</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── TAB 2: COMPANY SETTINGS ─── */}
            {activeTab === "config" && config && (
              <form onSubmit={handleSaveConfig} className="space-y-6 max-w-4xl">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <div>
                    <h2 className="text-lg font-black text-white">Company Information & Contact</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Update phone numbers, email, state licensing, and operating hours across the entire website.
                    </p>
                  </div>

                  {configSaveSuccess && (
                    <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      <span className="font-medium">{configSaveMsg || "Company settings saved successfully!"}</span>
                    </div>
                  )}

                  {configSaveError && (
                    <div className="p-3.5 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                      <span className="font-medium">{configSaveError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Display Phone Number
                      </label>
                      <input
                        type="text"
                        value={config.phone}
                        onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Raw Phone for Links (e.g. +12394841808)
                      </label>
                      <input
                        type="text"
                        value={config.phoneRaw}
                        onChange={(e) => setConfig({ ...config, phoneRaw: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={config.email}
                        onChange={(e) => setConfig({ ...config, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        State License #
                      </label>
                      <input
                        type="text"
                        value={config.licenseNumber}
                        onChange={(e) => setConfig({ ...config, licenseNumber: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Weekday Hours
                      </label>
                      <input
                        type="text"
                        value={config.hoursWeekdays}
                        onChange={(e) => setConfig({ ...config, hoursWeekdays: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Saturday Hours
                      </label>
                      <input
                        type="text"
                        value={config.hoursSaturday}
                        onChange={(e) => setConfig({ ...config, hoursSaturday: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Service Areas Notice
                    </label>
                    <input
                      type="text"
                      value={config.serviceAreasText}
                      onChange={(e) => setConfig({ ...config, serviceAreasText: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSavingConfig}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition flex items-center gap-2 shadow-lg shadow-amber-400/10 disabled:opacity-50"
                    >
                      {isSavingConfig ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving Changes...</span>
                        </>
                      ) : (
                        <span>Save Company Settings</span>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </main>

      {/* ─── MODAL: EDIT SERVICE DRAWER ─── */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-400">
                  Editing: {editingService.slug}
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  {editingService.title}
                </h3>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveService} className="flex-1 overflow-y-auto p-6 space-y-6">
              {serviceSaveSuccess && (
                <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span className="font-medium">{serviceSaveMsg || "Service updated successfully!"}</span>
                </div>
              )}

              {serviceSaveError && (
                <div className="p-3.5 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span className="font-medium">{serviceSaveError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Badge Text
                  </label>
                  <input
                    type="text"
                    value={editingService.badge}
                    onChange={(e) =>
                      setEditingService({ ...editingService, badge: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Hero Image Field & Live Uploader */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Service Hero Image
                  </label>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    Max 5MB (JPG, PNG, WebP)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {/* Current Image Preview */}
                  <div className="relative w-full sm:w-36 h-24 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0">
                    {editingService.heroImage ? (
                      <Image
                        src={editingService.heroImage}
                        alt={editingService.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="cursor-pointer px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition flex items-center gap-1.5 shadow-md shadow-amber-400/10">
                        {isUploadingImage ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Uploading to Git...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload New Photo</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          disabled={isUploadingImage}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-slate-500">or edit path below:</span>
                    </div>

                    <input
                      type="text"
                      value={editingService.heroImage}
                      onChange={(e) =>
                        setEditingService({ ...editingService, heroImage: e.target.value })
                      }
                      placeholder="/images/example.jpg"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
                    />
                  </div>
                </div>

                {imageUploadSuccess && (
                  <div className="p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{imageUploadSuccess}</span>
                  </div>
                )}

                {imageUploadError && (
                  <div className="p-2.5 bg-red-500/15 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{imageUploadError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={editingService.tagline}
                  onChange={(e) =>
                    setEditingService({ ...editingService, tagline: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Short Description (Card Summary)
                </label>
                <textarea
                  rows={2}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Long Detailed Description (Service Page)
                </label>
                <textarea
                  rows={4}
                  value={editingService.longDescription}
                  onChange={(e) =>
                    setEditingService({ ...editingService, longDescription: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Bullet Point Features ({editingService.features.length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingService({
                        ...editingService,
                        features: [...editingService.features, "New feature capability"],
                      })
                    }
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Bullet</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {editingService.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => {
                          const updated = [...editingService.features];
                          updated[idx] = e.target.value;
                          setEditingService({ ...editingService, features: updated });
                        }}
                        className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingService.features.filter((_, i) => i !== idx);
                          setEditingService({ ...editingService, features: updated });
                        }}
                        className="p-2 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Frequently Asked Questions ({editingService.faqs.length})
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingService({
                        ...editingService,
                        faqs: [
                          ...editingService.faqs,
                          { question: "New FAQ Question?", answer: "Detailed answer goes here." },
                        ],
                      })
                    }
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold flex items-center gap-1 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {editingService.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 relative"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editingService.faqs.filter((_, i) => i !== idx);
                          setEditingService({ ...editingService, faqs: updated });
                        }}
                        className="absolute top-2 right-2 p-1 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...editingService.faqs];
                          updated[idx] = { ...updated[idx], question: e.target.value };
                          setEditingService({ ...editingService, faqs: updated });
                        }}
                        className="w-[90%] px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...editingService.faqs];
                          updated[idx] = { ...updated[idx], answer: e.target.value };
                          setEditingService({ ...editingService, faqs: updated });
                        }}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex gap-3 border-t border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingService}
                  className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSavingService ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Service...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
