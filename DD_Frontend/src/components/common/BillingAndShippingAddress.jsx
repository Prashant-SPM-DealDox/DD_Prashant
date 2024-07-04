import React, { useState } from "react";
import "../../assets/css/common/BillingAndShippingAddress.css";
import "font-awesome/css/font-awesome.min.css";
import HeaderBar from "./HeaderBar";

const BillingAndShippingAddress = ({
  billingAddress,
  setBillingAddress,
  shippingAddress,
  setShippingAddress,
  readOnly = false,
  setUnchangedSave
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isShippingVisible, setShippingVisible] = useState(false);

  const toggleBillingVisibility = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleShippingVisibility = () => {
    setShippingVisible(!isShippingVisible);
  };


 const handleChange = (addressType, field, value) => {
    setUnchangedSave(true);
    if (['billing_city', 'billing_state', 'billing_country', 'shipping_city', 'shipping_state', 'shipping_country'].includes(field)) {
      value = value.replace(/[^A-Za-z\s]/g, "");
    }
    if (['billing_zip', 'billing_phone', 'shipping_zip', 'shipping_phone'].includes(field)) {
      value = value.replace(/\D/g, ""); 
    }
    if (addressType === "billing") {
      setBillingAddress({
        ...billingAddress,
        [field]: value,
      });
    } else if (addressType === "shipping") {
      setShippingAddress({
        ...shippingAddress,
        [field]: value,
      });
    }
  };

  
  return (
    <div className="containerA6">
      <div className="left1a">
        <div onClick={toggleBillingVisibility}  id="billing_visisbility">
          <HeaderBar
            headerlabel={"BILLING ADDRESS"}
            isButtonVisible={true}
            isDropdownOpen={isDropdownOpen}
          />
        </div>
        {isDropdownOpen && (
          <div id="billOne">
            <div className="content9">
              <div className="street1">
               <input
                  autoComplete="new-password"
                  className="billing"
                  type="text"
                  value={billingAddress.billing_street1}
                  onChange={(e) => handleChange("billing", "billing_street1", e.target.value)}
                  readOnly={readOnly}
                />
                <label>STREET-1</label>
              </div>
              <div className="street2">
                <input
                  autoComplete="new-password"
                  className="billing"
                  type="text"
                  value={billingAddress.billing_street2}
                  onChange={(e) => handleChange("billing", "billing_street2", e.target.value)}
                  readOnly={readOnly}
                  
                />
                <label>STREET-2</label>
              </div>
            </div>
            <div className="content9">
              <div className="street1">
                <input
                  autoComplete="new-password"
                  className="billing"
                  type="text"
                  value={billingAddress.billing_city}
                  onChange={(e) => handleChange("billing", "billing_city", e.target.value)}
                  readOnly={readOnly}
                />
                <label>CITY</label>
              </div>
              <div className="street2">
                <input
                  autoComplete="new-password"
                  className="billing"
                  type="text"
                  value={billingAddress.billing_state}
                  onChange={(e) => handleChange("billing", "billing_state", e.target.value)}
                  readOnly={readOnly}
                />
                <label>STATE</label>
              </div>
            </div>
            <div className="content9">
              <div className="street1">
                <input
                  autoComplete="new-password"
                  className="billing"
                  type="tel"
                  maxLength="9"
                  value={billingAddress.billing_zip?billingAddress.billing_zip:""}
                  onChange={(e) => handleChange("billing", "billing_zip", e.target.value)}
                  readOnly={readOnly}
                  onWheel={(e) => e.target.blur()}
                />
                <label>ZIP</label>
              </div>
              <div className="street2">
                <input
                  autoComplete="new-password"
                  className="billing"
                  type="text"
                  value={billingAddress.billing_country}
                  onChange={(e) => handleChange("billing", "billing_country", e.target.value)}
                  readOnly={readOnly}
                />
                <label>COUNTRY</label>
              </div>
            </div>
            <div className="content9phone">
              <input
                autoComplete="new-password"
                className="billing"
                type="tel"
                value={billingAddress.billing_phone?billingAddress.billing_phone:""}
                onChange={(e) => handleChange("billing", "billing_phone", e.target.value)}
                readOnly={readOnly}
                maxLength="15"
              />
              <label>PHONE</label>
            </div>
          </div>
        )}
      </div>

      {/* Shipping */}
      <div className="right1a">
        <div onClick={toggleShippingVisibility} id="shipping_visisbility">
          <HeaderBar
            headerlabel={"SHIPPING ADDRESS"}
            isButtonVisible={true}
            isDropdownOpen={isShippingVisible}
          />
        </div>
        <div id="ship" className={isShippingVisible ? "" : "hidden"}>
          <div className="content10">
            <div className="street1">
              <input
                autoComplete="new-password"
                className="shipping"
                type="text"
                value={shippingAddress.shipping_street1}
                onChange={(e) => handleChange("shipping", "shipping_street1", e.target.value)}
                readOnly={readOnly}
              />
              <label>STREET-1</label>
            </div>
            <div className="street2">
              <input
                autoComplete="new-password"
                className="shipping"
                type="text"
                value={shippingAddress.shipping_street2}
                onChange={(e) => handleChange("shipping", "shipping_street2", e.target.value)}
                readOnly={readOnly}
              />
              <label>STREET-2</label>
            </div>
          </div>
          <div className="content10">
            <div className="street1">
              <input
                autoComplete="new-password"
                className="shipping"
                type="text"
                value={shippingAddress.shipping_city}
                onChange={(e) => handleChange("shipping", "shipping_city", e.target.value)}
                readOnly={readOnly}
              />
              <label>CITY</label>
            </div>
            <div className="street2">
              <input
                autoComplete="new-password"
                className="shipping"
                type="text"
                value={shippingAddress.shipping_state}
                onChange={(e) => handleChange("shipping", "shipping_state", e.target.value)}
                readOnly={readOnly}
              />
              <label>STATE</label>
            </div>
          </div>
          <div className="content10">
            <div className="street1">
              <input
                autoComplete="new-password"
                className="shipping"
                type="tel"
                maxLength="9"
                value={shippingAddress.shipping_zip?shippingAddress.shipping_zip:""}
                onChange={(e) => handleChange("shipping", "shipping_zip", e.target.value)}
                readOnly={readOnly}
              />
              <label>ZIP</label>
            </div>
            <div className="street2">
              <input
                autoComplete="new-password"
                className="shipping"
                type="text"
                value={shippingAddress.shipping_country}
                onChange={(e) => handleChange("shipping", "shipping_country", e.target.value)}
                readOnly={readOnly}
              />
              <label>COUNTRY</label>
            </div>
          </div>
          <div className="content10phone">
            <input
            type="tel"
              autoComplete="new-password"
              className="shipping"
              maxLength="15"
              value={shippingAddress.shipping_phone?shippingAddress.shipping_phone:""}
              onChange={(e) => handleChange("shipping", "shipping_phone", e.target.value)}
              readOnly={readOnly}
              onWheel={(e) => e.target.blur()}
            />
            <label>PHONE</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingAndShippingAddress;
