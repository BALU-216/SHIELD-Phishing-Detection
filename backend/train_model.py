import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load Dataset
data = pd.read_csv("dataset/phishing.csv")

print("Dataset Loaded Successfully!")
print("Dataset Shape:", data.shape)

# -----------------------------
# Target Column
# -----------------------------
target_column = "label"

# Remove unnecessary text columns
drop_columns = [
    "FILENAME",
    "URL",
    "Domain",
    "TLD",
    "Title"
]

# Keep only columns that exist
drop_columns = [col for col in drop_columns if col in data.columns]

# Features
X = data.drop(columns=drop_columns + [target_column])

# Labels
y = data[target_column]

print("Features Selected:", X.shape[1])

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("Training Started...")

# Advanced Random Forest Model
model = RandomForestClassifier(
    n_estimators=300,      # More trees = better accuracy
    max_depth=25,
    random_state=42,
    n_jobs=-1
)

# Train Model
model.fit(X_train, y_train)

print("Training Completed!")

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print(f"\nModel Accuracy: {accuracy * 100:.2f}%")

# Detailed Report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save Model
joblib.dump(model, "model/phishing_model.pkl")

print("\nModel Saved Successfully!")