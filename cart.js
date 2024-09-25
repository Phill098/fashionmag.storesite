document.addEventListener('DOMContentLoaded', () => {
    const products = [
      { id: 'quantity1', price: 29.99 },
      { id: 'quantity2', price: 49.99 }
    ];
  
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout');
  
    const calculateTotal = () => {
      let total = 0;
      products.forEach(product => {
        const quantity = document.getElementById(product.id).value;
        total += quantity * product.price;
      });
      totalPriceElement.textContent = total.toFixed(2);
    };
  
    products.forEach(product => {
      document.getElementById(product.id).addEventListener('input', calculateTotal);
    });
  
    checkoutButton.addEventListener('click', () => {
      const orderDetails = products.map(product => {
        const quantity = document.getElementById(product.id).value;
        return { productId: product.id, quantity };
      });
  
      const sendOrder = firebase.functions().httpsCallable('sendOrder');
      sendOrder({ orderDetails })
        .then(result => {
          alert('Order placed successfully!');
        })
        .catch(error => {
          console.error('Error placing order: ', error);
        });
    });
  
    calculateTotal();
  });

  
  