
import React from 'react';

function Section({ title, items }) {
  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ItineraryLayout({ data }) {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Trip to {data.place}</h1>
      <p className="text-md">From: {data.from} | To: {data.to}</p>

      <Section title="Nearby Places to Visit" items={data.nearByplaceToVisit} />
      <Section title="Documents Required" items={data.documentsReq.flat()} />
      <Section title="Best Time to Visit" items={data.bestTimeToVisit} />
      <Section title="Best Route From Your Location" items={data.bestRouteFromYourLocation} />
      <Section title="Shopping Places" items={data.shoppingPlaces} />
      <Section title="Local Food" items={data.localFood} />
      <Section title="Local Transport" items={data.localTransport} />
      <Section title="Languages Spoken" items={data.localLanguage} />
      <Section title="Culture" items={data.localCulture} />
      <Section title="Customs" items={data.localCustoms} />
      <Section title="Festivals" items={data.localFestivals} />
      <Section title="Local Events" items={data.localEvents} />
      <Section title="Attractions" items={data.localAttractions} />
      <Section title="Weather" items={data.localWeather} />
      <Section title="Currency" items={data.localCurrency} />
      <Section title="Accommodation Options" items={data.localAccommodation} />
      <Section title="Transportation" items={data.localTransportation} />
      <Section title="Shopping Items" items={data.localShopping} />
      <Section title="Safety Tips" items={data.localSafety} />
      <Section title="Health Tips" items={data.localHealthTips} />
      <Section title="Emergency Contacts" items={data.localEmergencyNumbers} />
      <Section title="History" items={data.localHistory} />
      <Section title="Art" items={data.localArt} />
      <Section title="Music" items={data.localMusic} />
    </div>
  );
}

export default ItineraryLayout;
