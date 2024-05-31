const deleteButtons = document.querySelectorAll('.btnDelete');
const updateButtons = document.querySelectorAll('.btnUpdateRestaurant');

const confirmDeletion = (restaurantId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to recover the deleted restaurant",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    dangerMode: true,
  }).then((result) => {
    if (result.isConfirmed) {
        window.location.href = `/deleteRestaurant/${restaurantId}`;
        Swal.fire('The restaurant has been deleted','', 'success');
    } else {
      Swal.fire('The restaurant has not been deleted');
    }
  });
};

const confirmUpdate = (restaurantId) => {
Swal.fire({
  title: 'Are you sure?',
  text: "The restaurant data will be updated",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Update',
  cancelButtonText: 'Cancel',
  dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Make a POST request to the server
        fetch(`/updateRestaurant`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: restaurantId })
        })
        .then((response) => {
          if (response.ok) {
            Swal.fire('The restaurant has been updated', '', 'success');
            window.location.href = '/restaurants';
          } else {
            Swal.fire('There was an error updating the restaurant');
          }
        })
        .catch((error) => {
          Swal.fire('There was an error updating the restaurant');
        });
      } else {
        Swal.fire('The restaurant has not been updated');
      }
    });
};
  
deleteButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const restaurantId = btn.getAttribute('data-restaurant-id');
    confirmDeletion(restaurantId);
  });
});

updateButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const restaurantId = btn.getAttribute('data-restaurant-id');
      confirmUpdate(restaurantId);
    });
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const clickedButton = event.submitter;
    
    if (clickedButton.classList.contains('search-button')) {
    event.target.submit();
    return;
}
  
Swal.fire({
    title: 'Save Restaurant',
    text: 'Are you sure you want to save the restaurant?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Save',
    cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
          const submitButton = document.querySelector('.btnSaveRestaurant');
          submitButton.disabled = true;

          Swal.fire('Restaurant added', 'The restaurant has been saved successfully', 'success');

          event.target.submit();
        } else {
      Swal.fire('Action canceled', 'The restaurant has not been saved', 'info');
    }
  });
});