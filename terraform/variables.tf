variable "gcp_project_id" {
  type        = string
  description = "Google Cloud (GCP) Project ID to deploy Firebase resources"
}

variable "gcp_region" {
  type        = string
  default     = "asia-northeast1"
  description = "Default region for GCP resources (Tokyo)"
}

variable "firestore_location" {
  type        = string
  default     = "asia-northeast1"
  description = "Location for the Firestore Database (Tokyo)"
}

variable "storage_bucket_name" {
  type        = string
  default     = "satorun-dev-assets"
  description = "Globally unique name for the Cloud Storage Bucket used by Firebase"
}
