import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl mb-4">SIGN UP FOR NEW UPDATES</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Get exclusive updates on the collection's launch, personalized communication and the House's latest news.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <Input 
              type="email" 
              placeholder="Enter your email"  
              name='mail'
            />
            <Button className="bg-white text-black hover:bg-gray-100 px-8">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* May we help you */}
            <div>
              <h3 className="mb-4">May we help you?</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/users-profile" className="hover:text-white transition-colors">My Order</a></li>
                <li><a href="/users-profile" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="/users-profile" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="/users-profile" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              </ul>
            </div>

            {/* About Company */}
            <div>
              <h3 className="mb-4">About Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="/cart" className="hover:text-white transition-colors">Investors</a></li>
              </ul>
            </div>

            {/* Store Location */}
            <div>
              <h3 className="mb-4">Store Location</h3>
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841369319464!2d-73.98823492346422!3d40.75773597138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1704893775436!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Name Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-9xl tracking-widest opacity-50 font-serif font-bold">SONY</h1>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm border-t border-gray-800">
        <p>&copy; 2026 SONY. All rights reserved.</p>
      </div>
    </footer>
  );
}
