import React from 'react';

const ValueProps = () => {
  return (
    <div className="bg-neutral py-12 border-y border-pink-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="font-heading text-lg font-bold text-plum-dark mb-2">Premium Handbags</h3>
            <p className="font-body text-text-light text-sm">Carefully selected pieces that elevate your style.</p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-plum-dark mb-2">Secure Delivery</h3>
            <p className="font-body text-text-light text-sm">Fast and reliable shipping straight to your door.</p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-plum-dark mb-2">100% Satisfaction</h3>
            <p className="font-body text-text-light text-sm">Quality guaranteed on every purchase.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProps;
