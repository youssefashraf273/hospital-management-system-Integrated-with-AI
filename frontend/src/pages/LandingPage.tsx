import { Button } from "@/components/ui/button";
import {
  Activity,
  Calendar,
  ClipboardList,
  HeartPulse,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";
import docPlaceholder from "../assets/doctorPlaceholder.png";
export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">COREVIDA</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-teal-600">
              Home
            </Link>
            <Link
              to="/about"
              className="text-md font-medium text-gray-600 hover:text-teal-600"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-md font-medium text-gray-600 hover:text-teal-600"
            >
              Services
            </Link>
            <Link
              to="/dashboard/doctors"
              className="text-md font-medium text-gray-600 hover:text-teal-600"
            >
              Doctors
            </Link>
            <Link
              to="/contact"
              className="text-md font-medium text-gray-600 hover:text-teal-600"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden md:block text-md font-medium text-gray-600 hover:text-teal-600"
            >
              Login
            </Link>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-teal-700 py-20 md:py-42">
        <div className="absolute inset-0">
          <img src={heroImg} alt="hero" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container relative z-10 flex flex-col items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Advanced Healthcare for Your Family
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-10">
            Providing exceptional medical care with compassion and cutting-edge technology
            for over 25 years
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-teal-600 text-2xl font-bold py-7  hover:bg-primary hover:cursor-pointer hover:text-white"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Medical Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a wide range of medical services to meet all your healthcare needs
              with the highest standards of quality and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Activity className="h-10 w-10 text-teal-600" />,
                title: "Emergency Care",
                description:
                  "24/7 emergency services with rapid response teams for critical situations.",
              },
              {
                icon: <ClipboardList className="h-10 w-10 text-teal-600" />,
                title: "Specialized Treatments",
                description:
                  "Advanced specialized treatments across all major medical disciplines.",
              },
              {
                icon: <Calendar className="h-10 w-10 text-teal-600" />,
                title: "Online Consultations",
                description:
                  "Connect with our doctors remotely for convenient healthcare access.",
              },
              {
                icon: <HeartPulse className="h-10 w-10 text-teal-600" />,
                title: "Preventive Care",
                description:
                  "Comprehensive health checkups and preventive care programs.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link
                  to="/services"
                  className="text-teal-600 font-medium flex items-center gap-1 hover:underline"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Doctors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of highly qualified medical professionals is dedicated to providing
              exceptional care to all our patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                specialty: "Cardiologist",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Dr. Michael Chen",
                specialty: "Neurologist",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Dr. Emily Rodriguez",
                specialty: "Pediatrician",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className=" relative max-h-[350px]">
                  <img
                    src={docPlaceholder}
                    alt={doctor.name}
                    className="object-cover max-h-[350px] mx-auto"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                  <p className="text-teal-600 mb-4">{doctor.specialty}</p>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
              <Link to="/dashboard/doctors">View All Doctors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Patient Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our patients have to say about their experience with our medical
              services and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Robert Williams",
                text: "The care I received at Corevida was exceptional. The doctors were knowledgeable and took the time to explain everything clearly.",
                rating: 5,
              },
              {
                name: "Jennifer Lopez",
                text: "I was impressed by how efficient and caring the staff was during my stay. The facilities are modern and comfortable.",
                rating: 5,
              },
              {
                name: "David Thompson",
                text: "The online consultation service saved me so much time. The doctor was thorough and the follow-up care was excellent.",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                      />
                    ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
              <p className="text-gray-600 mb-8">
                Have questions or need to schedule an appointment? Reach out to us using
                any of the methods below or fill out the contact form.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 765-4321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">info@corevida-plus.com</p>
                    <p className="text-gray-600">appointments@medicare-plus.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-gray-600">123 Healthcare Avenue</p>
                    <p className="text-gray-600">Medical District, CA 90210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Saturday: 8:00 AM - 2:00 PM</p>
                    <p className="text-gray-600">
                      Sunday: Closed (Emergency Care Available)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Appointment Request"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HeartPulse className="h-6 w-6 text-teal-400" />
                <span className="text-xl font-bold">Corevida</span>
              </div>
              <p className="text-gray-400 mb-4">
                Providing quality healthcare services with compassion and care for over 25
                years.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-teal-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-teal-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-teal-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/doctors"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Our Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Emergency Care
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Cardiology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Pediatrics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Neurology
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    Diagnostics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for health tips and hospital updates.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                />
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} Corevida Hospital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
