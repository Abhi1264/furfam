"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Upload,
  Trash2,
  LogOut,
  Loader2,
  Lock,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

interface GalleryItem {
  id: string;
  name: string;
  image: string;
  type: string;
  temperament: string[];
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  email: string;
}

interface AdminUser {
  id: string;
  email: string;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    temperament: "",
    image: null as File | null,
  });
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  const [creatingUser, setCreatingUser] = useState(false);
  const [userError, setUserError] = useState("");
  const [userSuccess, setUserSuccess] = useState("");
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    loadGallery();
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadUsers();
    }
  }, [authenticated]);

  const loadUsers = async () => {
    try {
      const res = await fetch("/api/auth/users");
      if (res.ok) {
        const data = await res.json();
        setAdminUsers(data.users || []);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error("Error loading gallery:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setAuthenticated(true);
        setEmail("");
        setPassword("");
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch {
      setLoginError("An error occurred during login");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setAuthenticated(false);
      router.push("/admin/gallery");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.image) {
      alert("Please fill in all fields and select an image");
      return;
    }

    setUploading(true);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("name", formData.name);
      uploadFormData.append("type", formData.type);
      uploadFormData.append("temperament", formData.temperament);
      uploadFormData.append("image", formData.image);

      const res = await fetch("/api/gallery", {
        method: "POST",
        body: uploadFormData,
      });

      if (res.ok) {
        await loadGallery();
        setFormData({
          name: "",
          type: "",
          temperament: "",
          image: null,
        });
        // Reset file input
        const fileInput = document.getElementById(
          "image-input",
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      } else {
        const data = await res.json();
        alert(data.error || "Failed to upload image");
      }
    } catch {
      alert("An error occurred while uploading");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadGallery();
      } else {
        alert("Failed to delete image");
      }
    } catch {
      alert("An error occurred while deleting");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    setUserError("");
    setUserSuccess("");

    try {
      const res = await fetch("/api/auth/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userFormData),
      });

      const data = await res.json();

      if (res.ok) {
        setUserSuccess(`User ${data.user.email} created successfully!`);
        setUserFormData({ email: "", password: "" });
        await loadUsers(); // Refresh user list
      } else {
        setUserError(data.error || "Failed to create user");
      }
    } catch {
      setUserError("An error occurred while creating user");
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setDeletingUserId(userId);

    try {
      const res = await fetch(`/api/auth/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadUsers(); // Refresh user list
        setUserSuccess("User deleted successfully!");
        setTimeout(() => setUserSuccess(""), 3000);
      } else {
        const data = await res.json();
        setUserError(data.error || "Failed to delete user");
        setTimeout(() => setUserError(""), 3000);
      }
    } catch {
      setUserError("An error occurred while deleting user");
      setTimeout(() => setUserError(""), 3000);
    } finally {
      setDeletingUserId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary">
                <Lock className="h-5 w-5" />
                <CardTitle className="font-serif text-2xl">
                  Admin Login
                </CardTitle>
              </div>
              <CardDescription>
                Sign in to manage gallery images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="admin@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {loginError && (
                  <div className="text-sm text-destructive">{loginError}</div>
                )}
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                Gallery Management
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
                Manage Gallery Images
              </h1>
              <p className="text-muted-foreground mt-2">
                Upload and manage images for the gallery section
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload New Image</CardTitle>
              <CardDescription>
                Add a new image to the gallery section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Golden Retriever"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      placeholder="Sporting"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperament">
                    Temperament (comma-separated)
                  </Label>
                  <Input
                    id="temperament"
                    value={formData.temperament}
                    onChange={(e) =>
                      setFormData({ ...formData, temperament: e.target.value })
                    }
                    placeholder="Friendly, Active, Intelligent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-input">Image *</Label>
                  <Input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({ ...formData, image: file });
                      }
                    }}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={uploading}
                  className="cursor-pointer"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>User Management</CardTitle>
              </div>
              <CardDescription>
                Add new admin users to manage the gallery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email *</Label>
                    <Input
                      id="user-email"
                      type="email"
                      value={userFormData.email}
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          email: e.target.value,
                        })
                      }
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password *</Label>
                    <Input
                      id="user-password"
                      type="password"
                      value={userFormData.password}
                      onChange={(e) =>
                        setUserFormData({
                          ...userFormData,
                          password: e.target.value,
                        })
                      }
                      placeholder="Minimum 8 characters"
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                {userError && (
                  <div className="text-sm text-destructive">{userError}</div>
                )}
                {userSuccess && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    {userSuccess}
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={creatingUser}
                  className="cursor-pointer"
                >
                  {creatingUser ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create User
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {adminUsers.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Existing Users ({adminUsers.length})</CardTitle>
                <CardDescription>
                  Manage admin users. You cannot delete your own account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {adminUsers.map((adminUser) => (
                    <div
                      key={adminUser.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">
                          {adminUser.email}
                          {adminUser.id === user?.id && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              (You)
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Created:{" "}
                          {new Date(adminUser.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(adminUser.id)}
                        disabled={
                          deletingUserId === adminUser.id ||
                          adminUser.id === user?.id ||
                          adminUsers.length <= 1
                        }
                        className="cursor-pointer"
                      >
                        {deletingUserId === adminUser.id ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </>
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Gallery Images ({items.length})
            </h2>
            {items.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No images uploaded yet. Upload your first image above.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-xs bg-secondary px-2 py-1 rounded">
                            {item.type}
                          </span>
                          {item.temperament.slice(0, 3).map((t, i) => (
                            <span
                              key={i}
                              className="text-xs bg-secondary/50 px-2 py-1 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        className="w-full cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
