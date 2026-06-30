# 1. GCP APIs & Services Activation
resource "google_project_service" "firebase" {
  project = var.gcp_project_id
  service = "firebase.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "firestore" {
  project = var.gcp_project_id
  service = "firestore.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "identitytoolkit" {
  project = var.gcp_project_id
  service = "identitytoolkit.googleapis.com"
  disable_on_destroy = false
}

resource "google_project_service" "storage" {
  project = var.gcp_project_id
  service = "firebasestorage.googleapis.com"
  disable_on_destroy = false
}

# 2. Firebase Project Enablement
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = var.gcp_project_id

  depends_on = [
    google_project_service.firebase
  ]
}

# 3. Firebase Web App Registration
resource "google_firebase_web_app" "default" {
  provider     = google-beta
  project      = var.gcp_project_id
  display_name = "satorun-dev-web-app"

  depends_on = [
    google_firebase_project.default
  ]
}

# 4. Identity Platform (Firebase Authentication) Configuration
resource "google_identity_platform_config" "default" {
  provider = google-beta
  project  = var.gcp_project_id

  # Enable Email/Password Provider
  sign_in {
    email {
      enabled           = true
      password_required = true
    }
  }

  depends_on = [
    google_project_service.identitytoolkit,
    google_firebase_project.default
  ]
}

# 5. Firestore Database Creation
resource "google_firestore_database" "default" {
  provider    = google-beta
  project     = var.gcp_project_id
  name        = "(default)"
  location_id = var.firestore_location
  type        = "FIRESTORE_PRIMARY"

  depends_on = [
    google_project_service.firestore,
    google_firebase_project.default
  ]
}

# 6. Cloud Storage Bucket Configuration (Firebase Storage backed)
resource "google_storage_bucket" "research_assets" {
  project                     = var.gcp_project_id
  name                        = var.storage_bucket_name
  location                    = upper(var.gcp_region)
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true

  # Prevents accidental deletion of storage
  lifecycle {
    prevent_destroy = false
  }
}

# Link Google Storage with Firebase Storage
resource "google_firebase_storage_bucket" "default" {
  provider  = google-beta
  project   = var.gcp_project_id
  bucket_id = google_storage_bucket.research_assets.name

  depends_on = [
    google_project_service.storage,
    google_firebase_project.default
  ]
}
