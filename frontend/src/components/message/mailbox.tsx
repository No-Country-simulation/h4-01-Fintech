"use client";

import React, { useEffect, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { getAllNotifications, markNotificationAsRead, deleteNotification } from "@/services/notifications";
import Loading from "@/app/loanding";

interface Notification {
    id: string;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export const Mailbox = ({ userId }: { userId: string }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const data = await getAllNotifications(userId);
                const formattedData = data.map((notif: any) => ({
                    id: notif.id,
                    title: notif.message, // Assuming title is the same as message
                    message: notif.message,
                    isRead: notif.read_status,
                    createdAt: notif.timestamp.toISOString(),
                }));
                setNotifications(formattedData);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [userId]);

    const handleMarkAsRead = async (notificationId: string) => {
        try {
            await markNotificationAsRead(notificationId);
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif.id === notificationId ? { ...notif, isRead: true } : notif
                )
            );
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const handleDeleteNotification = async (notificationId: string) => {
        try {
            await deleteNotification(userId, notificationId);
            setNotifications((prev) =>
                prev.filter((notif) => notif.id !== notificationId)
            );
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (notifications.length === 0) {
        return <p className="text-center">No Tienes Notificaciones.</p>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:max-w-4xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Tus Mensajes</h2>
            <div className="max-h-[500px] overflow-y-scroll space-y-3">
                <Accordion.Root type="single" collapsible className="space-y-2">
                    {notifications.map((notif) => (
                        <Accordion.Item
                            key={notif.id}
                            value={notif.id}
                            className="border rounded-lg shadow-sm overflow-hidden"
                        >
                            <Accordion.Trigger
                                onClick={() => {
                                    if (!notif.isRead) handleMarkAsRead(notif.id);
                                }}
                                className={`flex items-center justify-between p-4 w-full text-left transition-colors ${notif.isRead ? "bg-gray-100" : "bg-white"
                                    } hover:bg-gray-50`}
                            >
                                <div className="flex items-center space-x-2">
                                    {notif.isRead ? (
                                        <CheckCircle className="text-green-500 w-5 h-5" />
                                    ) : (
                                        <Circle className="text-gray-400 w-5 h-5" />
                                    )}
                                    <span>{notif.title}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">
                                        {new Date(notif.createdAt).toLocaleDateString()}
                                    </span>
                                    <button
                                        className="text-red-500 hover:text-red-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteNotification(notif.id);
                                        }}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </Accordion.Trigger>
                            <Accordion.Content className="p-4 bg-gray-50">
                                <p className="text-gray-700">{notif.message}</p>
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </div>
        </div>
    );
};
