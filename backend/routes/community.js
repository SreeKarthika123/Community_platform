const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Community = require('../models/Community');
const Membership = require('../models/Membership');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Create Community
router.post('/', auth, async (req, res) => {
  const existingCommunity = await Community.findOne({ name: req.body.name });
    if (existingCommunity) {
      return res.status(400).json({ message: 'Community name already exists. Please choose another name.' });
    }
  const community = new Community({ name: req.body.name, owner: req.user._id });
  await community.save();

  await new Membership({
    community: community._id,
    user: req.user._id,
    role: 'Community Admin',
  }).save();

  res.json(community);
});

// Get All Communities
router.get('/', auth, async (req, res) => {
  const communities = await Community.find();
  res.json(communities);
});

// Get Members
router.get('/:id/members', auth, async (req, res) => {
  const members = await Membership.find({ community: req.params.id }).populate('user', 'name email');
  res.json(members);
});



router.post('/:id/members', auth, async (req, res) => {

  const communityId = req.params.id;
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    // 1. Find community
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // 2.  Only owner can add members
    if (community.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the community owner can add members' });
    }

    // 3. Create user if not exists
    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name, email, password: hashedPassword });
      await user.save();
    }

    // 4. Check if user is already a member
    const existingMembership = await Membership.findOne({
      community: communityId,
      user: user._id,
    });

    if (existingMembership) {
      return res.status(400).json({ message: 'User is already a member of this community' });
    }

    // 5. Create new membership
    const newMembership = new Membership({
      community: communityId,
      user: user._id,
      role: 'Community Member',
    });

    await newMembership.save();
    await newMembership.populate('user');

    return res.status(200).json({
      message: 'User successfully added to the community',
      member: newMembership,
    });
  } catch (err) {
    console.error('❌ Error creating user or adding to community:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.delete('/:id/members/:userId', auth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Check if the logged-in user is the creator of the community
    if (community.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only the community creator can remove members.' });
    }

    // Prevent the admin from removing themselves (optional)
    if (req.user._id.toString() === req.params.userId) {
      return res.status(400).json({ message: 'You cannot remove yourself from the community.' });
    }

    // Remove the user from the community
    const result = await Membership.findOneAndDelete({
      community: req.params.id,
      user: req.params.userId
    });

    if (!result) {
      return res.status(404).json({ message: 'User is not a member of this community.' });
    }

    res.json({ message: 'Member removed successfully.' });
  } catch (err) {
    console.error('Error removing member:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Get My Owned Communities
router.get('/me/owner', auth, async (req, res) => {
  try {
    const communities = await Community.find({ owner: req.user._id });
    res.json(communities);
  } catch (err) {
    console.error('Error fetching owned communities:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get My Joined Communities (excluding owned ones)
router.get('/me/joined', auth, async (req, res) => {
  try {
    const memberships = await Membership.find({ user: req.user._id }).populate('community');
    // Exclude owned communities
    const joinedCommunities = memberships
      .map(m => m.community)
      .filter(c => c.owner.toString() !== req.user._id.toString());
    
    res.json(joinedCommunities);
  } catch (err) {
    console.error('Error fetching joined communities:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
