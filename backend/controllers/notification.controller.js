import Notification from '../models/Notification.model.js';

export const createNotification = async (req, res) => {
  try {
    const { title, message, priority, type } = req.body;
    const newNotification = new Notification({ title, message, priority, type });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: 'Error creating notification' });
  }
};


export const getNotifications = async (req, res) => {
  try {
    const { unread } = req.query;
    const filter = unread ? { read: false } : {};
    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};


export const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Notification not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error marking notification as read' });
  }
};


export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting notification' });
  }
};
