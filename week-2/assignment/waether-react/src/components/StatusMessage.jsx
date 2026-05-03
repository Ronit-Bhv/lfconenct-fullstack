function StatusMessage({ status, error }) {
    if (status === "loading") {
        return (
            <div className="status-message status-loading">
                <div className="spinner"></div>
                <p>Fetching weather data...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="status-message status-error">
                <p>{error}</p>
            </div>
        );
    }

    if (status === "idle") {
        return (
            <div className="status-message status-idle">
                <p>Enter a city name to get started.</p>
            </div>
        );
    }

    return null;
}

export default StatusMessage;