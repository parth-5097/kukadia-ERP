const csc = require("country-state-city").default;

exports.defaultCSC = (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    country: csc.getAllCountries(),
    state: csc.getStatesOfCountry("US"),
    city: csc.getCitiesOfState("US", "NY"),
  });
};

exports.Country = (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    data: csc.getAllCountries(),
  });
};

exports.State = (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    data: csc.getStatesOfCountry(req.params.countryCode),
  });
};

exports.City = (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    data: csc.getCitiesOfState(req.params.countryCode, req.params.stateCode),
  });
};
