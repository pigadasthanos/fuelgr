  //***********Δινει χρωμα στις τιμεσ αναλογα με τον μεσο ορο**************
      function setColorPrice(){
            for (var i = 0; i < objstation.price.length; i++) {
                
                  if(minPrice.price<=objstation.price[i] && (objstation.price[i]<=minPrice.price+0.15*(maxPrice.price-minPrice.price))){
                        // === τιμες κοντα στο ελαχιστο===
                        objstation.priceColor[i]='price_green';
                  }
                  else{
                      if (maxPrice.price>=objstation.price[i] && (objstation.price[i]>=maxPrice.price-0.15*(maxPrice.price-minPrice.price))){
                        // === τιμες κοντα στο μεγιστο===
                        
                        objstation.priceColor[i]='price_red';
                      }else{
                       // === τιμες κοντα στο μεσο ορο===
                      objstation.priceColor[i]='price_blue';
                      }  
                  }
            }
      }//***********ΤΕΛΟΣ function που δινει χρωμα στις τιμεσ αναλογα με τον μεσο ορο**************