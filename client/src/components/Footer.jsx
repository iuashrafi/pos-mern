import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <div className=" bg-white border-t w-full pt-8 flex justify-between px-8 py-6">
      <div>
        <ul>
          <li className="font-semibold">Customers</li>
          <li>Signin</li>
          <li>Create An Account</li>
          <li>Help</li>
        </ul>
      </div>
      <div>
        <ul>
          <li className="font-semibold">Products</li>
          <li>Point of Sale</li>
          <li>Payments</li>
        </ul>
      </div>
      <div>
        <span>
          <Linkedin />
        </span>
      </div>
    </div>
  );
};

export default Footer;
