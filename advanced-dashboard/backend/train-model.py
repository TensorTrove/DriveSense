import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

# example dataset
data = {
    'time_of_day': [8, 9, 10, 17, 18, 19],
    'traffic_density': [70, 80, 60, 90, 85, 75]
}

df = pd.DataFrame(data)

X = df[['time_of_day']]
y = df['traffic_density']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

joblib.dump(model, 'traffic_model.pkl')
