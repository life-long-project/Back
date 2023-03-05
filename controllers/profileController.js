const profile = require("../models/user_profile");

exports.createProfile = async (req, res, next) => {
  try {
    const newProfile = await profile.create(req.body);
    res.status(201).json({
      message: "your profile created successfully!",
      data: {
        profile: newProfile,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// exports.getAllprofiles
exports.getAllprofiles = async (req, res, next) => {
  try {
    const queryObject = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((Element) => delete queryObject[Element]);
    const profilee = await profile.find(queryObject);

    res.status(200).json({
      status: "success",
      results: profilee.length,
      data: { profilee },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profileee = await profile.findById(req.params.id);
    res.json({ data: profileee, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const profileee = await profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({ status: "success", data: profileee });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
exports.deleteProfile = async (req, res) => {
  try {
    await profile.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success" });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
