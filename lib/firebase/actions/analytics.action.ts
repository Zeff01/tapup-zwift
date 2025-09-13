/**
 * Analytics tracking for card interactions
 */

import { 
  doc, 
  updateDoc, 
  arrayUnion, 
  increment,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  serverTimestamp
} from "../firestore-monitored";
import { firebaseDb } from "../firebase";

interface AnalyticsView {
  timestamp: Timestamp;
  uniqueVisitor: boolean;
  referrer?: string;
  userAgent?: string;
}

interface AnalyticsVcfDownload {
  timestamp: Timestamp;
  platform?: string;
}

interface AnalyticsLinkClick {
  timestamp: Timestamp;
  linkType: string;
  destination: string;
}

interface CardAnalytics {
  cardId: string;
  ownerId: string;
  totalViews: number;
  uniqueViews: number;
  totalVcfDownloads: number;
  totalLinkClicks: number;
  views: AnalyticsView[];
  vcfDownloads: AnalyticsVcfDownload[];
  linkClicks: AnalyticsLinkClick[];
  lastUpdated: Timestamp;
}

/**
 * Get or create analytics document for a card
 */
async function getOrCreateAnalytics(cardId: string, ownerId: string): Promise<string> {
  const analyticsRef = doc(firebaseDb, "card-analytics", cardId);
  const analyticsSnap = await getDoc(analyticsRef);

  if (!analyticsSnap.exists()) {
    await setDoc(analyticsRef, {
      cardId,
      ownerId,
      totalViews: 0,
      uniqueViews: 0,
      totalVcfDownloads: 0,
      totalLinkClicks: 0,
      views: [],
      vcfDownloads: [],
      linkClicks: [],
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp()
    });
  }

  return analyticsRef.id;
}

/**
 * Log a card view
 */
export async function logCardView(
  cardId: string, 
  ownerId: string,
  data: {
    referrer?: string;
    userAgent?: string;
    isUnique?: boolean;
  }
) {
  try {
    console.log("logCardView called with:", { cardId, ownerId, data });
    
    await getOrCreateAnalytics(cardId, ownerId);
    const analyticsRef = doc(firebaseDb, "card-analytics", cardId);

    const viewData: AnalyticsView = {
      timestamp: Timestamp.now(),
      uniqueVisitor: data.isUnique || false,
      referrer: data.referrer,
      userAgent: data.userAgent
    };

    const updates: any = {
      totalViews: increment(1),
      lastUpdated: serverTimestamp()
    };

    if (data.isUnique) {
      updates.uniqueViews = increment(1);
    }

    // Only keep last 1000 view records to prevent document from getting too large
    const analyticsSnap = await getDoc(analyticsRef);
    const currentViews = analyticsSnap.data()?.views || [];
    
    if (currentViews.length >= 1000) {
      // Keep only the last 900 views and add the new one
      updates.views = [...currentViews.slice(-900), viewData];
    } else {
      updates.views = arrayUnion(viewData);
    }

    await updateDoc(analyticsRef, updates);
    
    return { success: true };
  } catch (error) {
    console.error("Error logging card view:", error);
    return { success: false, error };
  }
}

/**
 * Log a VCF download
 */
export async function logVcfDownload(
  cardId: string,
  ownerId: string,
  data: {
    platform?: string;
  }
) {
  try {
    await getOrCreateAnalytics(cardId, ownerId);
    const analyticsRef = doc(firebaseDb, "card-analytics", cardId);

    const downloadData: AnalyticsVcfDownload = {
      timestamp: Timestamp.now(),
      platform: data.platform
    };

    await updateDoc(analyticsRef, {
      totalVcfDownloads: increment(1),
      vcfDownloads: arrayUnion(downloadData),
      lastUpdated: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error("Error logging VCF download:", error);
    return { success: false, error };
  }
}

/**
 * Log a link click
 */
export async function logLinkClick(
  cardId: string,
  ownerId: string,
  data: {
    linkType: string;
    destination: string;
  }
) {
  try {
    await getOrCreateAnalytics(cardId, ownerId);
    const analyticsRef = doc(firebaseDb, "card-analytics", cardId);

    const clickData: AnalyticsLinkClick = {
      timestamp: Timestamp.now(),
      linkType: data.linkType,
      destination: data.destination
    };

    await updateDoc(analyticsRef, {
      totalLinkClicks: increment(1),
      linkClicks: arrayUnion(clickData),
      lastUpdated: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error("Error logging link click:", error);
    return { success: false, error };
  }
}

/**
 * Get analytics for a specific card
 */
export async function getCardAnalytics(cardId: string): Promise<CardAnalytics | null> {
  try {
    const analyticsRef = doc(firebaseDb, "card-analytics", cardId);
    const analyticsSnap = await getDoc(analyticsRef);

    if (!analyticsSnap.exists()) {
      return null;
    }

    return analyticsSnap.data() as CardAnalytics;
  } catch (error) {
    console.error("Error getting card analytics:", error);
    return null;
  }
}

/**
 * Get analytics for multiple cards (for dashboard)
 */
export async function getMultipleCardAnalytics(cardIds: string[]): Promise<Record<string, CardAnalytics>> {
  try {
    const analytics: Record<string, CardAnalytics> = {};
    
    // Batch get analytics for all cards
    const promises = cardIds.map(async (cardId) => {
      const data = await getCardAnalytics(cardId);
      if (data) {
        analytics[cardId] = data;
      }
    });

    await Promise.all(promises);
    return analytics;
  } catch (error) {
    console.error("Error getting multiple card analytics:", error);
    return {};
  }
}

/**
 * Get analytics summary for a time period
 */
export async function getAnalyticsSummary(
  cardId: string,
  timeRange: 'daily' | 'weekly' | 'monthly'
): Promise<{
  views: number;
  uniqueViews: number;
  vcfDownloads: number;
  linkClicks: number;
  topLinks: Array<{ type: string; clicks: number }>;
} | null> {
  try {
    const analytics = await getCardAnalytics(cardId);
    if (!analytics) return null;

    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case 'daily':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'weekly':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'monthly':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
    }

    const startTimestamp = Timestamp.fromDate(startDate);

    // Filter data by time range
    const recentViews = analytics.views.filter(v => v.timestamp > startTimestamp);
    const recentDownloads = analytics.vcfDownloads.filter(d => d.timestamp > startTimestamp);
    const recentClicks = analytics.linkClicks.filter(c => c.timestamp > startTimestamp);

    // Count unique views
    const uniqueViews = recentViews.filter(v => v.uniqueVisitor).length;

    // Count top link types
    const linkTypeCounts: Record<string, number> = {};
    recentClicks.forEach(click => {
      linkTypeCounts[click.linkType] = (linkTypeCounts[click.linkType] || 0) + 1;
    });

    const topLinks = Object.entries(linkTypeCounts)
      .map(([type, clicks]) => ({ type, clicks }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);

    return {
      views: recentViews.length,
      uniqueViews,
      vcfDownloads: recentDownloads.length,
      linkClicks: recentClicks.length,
      topLinks
    };
  } catch (error) {
    console.error("Error getting analytics summary:", error);
    return null;
  }
}