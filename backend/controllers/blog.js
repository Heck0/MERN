const time = (req, res) => {
  res.json({ time: Date().toString() });
};

export default time;
