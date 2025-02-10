export const submitApplication = async (deliveryId, driverId) => {
  try {
    // This would be your actual API call
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        deliveryId,
        driverId
      })
    });

    if (!response.ok) {
      throw new Error('Application failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Application submission failed:', error);
    throw error;
  }
};

export const getApplicationStatus = async (applicationId) => {
  try {
    const response = await fetch(`/api/applications/${applicationId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch application status');
    }

    return await response.json();
  } catch (error) {
    console.error('Status check failed:', error);
    throw error;
  }
}; 