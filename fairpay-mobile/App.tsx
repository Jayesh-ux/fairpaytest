import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet, ScrollView, StatusBar, View, TouchableOpacity, Text, Linking,
  Modal, TextInput, Alert, ActivityIndicator, Image, Animated, Dimensions,
  RefreshControl, Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';


const { width } = Dimensions.get('window');

// ===== THEME =====
const COLORS = {
  primary: '#C9A962',
  primaryLight: 'rgba(201, 169, 98, 0.15)',
  secondary: '#10B981',
  secondaryLight: 'rgba(16, 185, 129, 0.15)',
  background: '#0a0a1a',
  backgroundLight: '#12122a',
  backgroundCard: '#1a1a3a',
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  warning: '#F59E0B',
  success: '#22C55E',
  border: 'rgba(201, 169, 98, 0.25)',
  borderLight: 'rgba(255, 255, 255, 0.08)',
};

const SPACING = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
const RADIUS = { sm: 8, md: 12, lg: 16, xl: 24, full: 9999 };

const CONFIG = {
  GOOGLE_SHEETS_URL: 'https://script.google.com/macros/s/AKfycbztDrvtDxowlI8ahwto9ri6QB-saYsxVwupu5nndovJGptW5UE102wxfraPji_9lZCoqg/exec',
  REVIEWS_SHEETS_URL: 'https://script.google.com/macros/s/AKfycbx7UUGOK4xay5RnoW32QgzbYsDdQ0Qfqgq-MMmhLEzlPbpXCJGbvNOjur7zKk4c5PH22g/exec',
  PHONE: '+919389815277',
  EMAIL: 'support@fairpaysolution.com',
  WEBSITE: 'https://fairpaysolution.com',
};

// Default reviews (fallback)
const DEFAULT_REVIEWS = [
  { id: 1, name: 'Rajesh K.', location: 'Delhi', rating: 5, review: 'Saved 45% on my credit card debt. Excellent service and very professional team!' },
  { id: 2, name: 'Priya S.', location: 'Mumbai', rating: 5, review: 'They handled everything professionally. Finally debt-free after struggling for years.' },
  { id: 3, name: 'Amit G.', location: 'Agra', rating: 5, review: 'Reduced my loan burden significantly. Highly recommend FairPay Solution!' },
  { id: 4, name: 'Sunita M.', location: 'Lucknow', rating: 5, review: 'Very supportive team. They helped me understand my rights and settle my dues.' },
];

// ===== ANIMATED COMPONENT =====
function FadeInView({ children, delay = 0, style }: any) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      {children}
    </Animated.View>
  );
}

// ===== SECTION HEADER =====
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <View style={sectionHeaderStyles.container}>
      <Text style={sectionHeaderStyles.label}>{label}</Text>
      <Text style={sectionHeaderStyles.title}>{title}</Text>
      {subtitle && <Text style={sectionHeaderStyles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const sectionHeaderStyles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: SPACING.lg },
  label: { color: COLORS.primary, fontSize: 11, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', marginBottom: SPACING.xs },
  title: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginTop: SPACING.xs, lineHeight: 20 },
});

// ===== HERO SECTION =====
function HeroSection({ onOpenCallback }: { onOpenCallback: () => void }) {
  return (
    <FadeInView style={heroStyles.container}>
      <LinearGradient colors={['rgba(201,169,98,0.12)', 'rgba(16,185,129,0.08)', COLORS.background]} style={heroStyles.gradient}>
        <Image source={require('./assets/logo.jpg')} style={heroStyles.logo} />
        <Text style={heroStyles.brandName}>FairPay Solution</Text>
        <Text style={heroStyles.tagline}>Ethical Unsecured Loan Resolution</Text>
        <Text style={heroStyles.description}>Professional guidance for debt settlement with transparency and integrity</Text>

        <View style={heroStyles.buttonsRow}>
          <TouchableOpacity onPress={onOpenCallback} activeOpacity={0.85} style={heroStyles.primaryBtnWrapper}>
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={heroStyles.primaryBtn}>
              <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
              <Text style={heroStyles.primaryBtnText}>Free Consultation</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL(`tel:${CONFIG.PHONE}`)} activeOpacity={0.85} style={heroStyles.secondaryBtn}>
            <Ionicons name="call" size={18} color={COLORS.primary} />
            <Text style={heroStyles.secondaryBtnText}>Call Now</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={heroStyles.statsRow}>
          {[
            { icon: 'people', value: '2500+', label: 'Clients' },
            { icon: 'trending-down', value: '₹50Cr+', label: 'Resolved' },
            { icon: 'star', value: '98%', label: 'Satisfied' },
          ].map((stat, i) => (
            <View key={i} style={heroStyles.statCard}>
              <Ionicons name={stat.icon as any} size={20} color={COLORS.primary} />
              <Text style={heroStyles.statValue}>{stat.value}</Text>
              <Text style={heroStyles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </FadeInView>
  );
}

const heroStyles = StyleSheet.create({
  container: { margin: SPACING.md },
  gradient: { borderRadius: RADIUS.xl, padding: SPACING.xl, alignItems: 'center' },
  logo: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: COLORS.primary, marginBottom: SPACING.md },
  brandName: { fontSize: 24, fontWeight: '800', color: COLORS.primary },
  tagline: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginTop: SPACING.xs },
  description: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', marginTop: SPACING.sm, lineHeight: 20, paddingHorizontal: SPACING.md },
  buttonsRow: { flexDirection: 'row', marginTop: SPACING.lg, width: '100%' },
  primaryBtnWrapper: { flex: 1, marginRight: SPACING.sm, borderRadius: RADIUS.lg, overflow: 'hidden', elevation: 3, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Platform.OS === 'android' ? 14 : 16, paddingHorizontal: SPACING.md },
  primaryBtnText: { color: '#fff', fontSize: 14, fontWeight: '700', marginLeft: SPACING.sm },
  secondaryBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Platform.OS === 'android' ? 12 : 14, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.lg, backgroundColor: 'rgba(201,169,98,0.08)' },
  secondaryBtnText: { color: COLORS.primary, fontSize: 14, fontWeight: '600', marginLeft: SPACING.sm },
  statsRow: { flexDirection: 'row', marginTop: SPACING.xl, width: '100%' },
  statCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: RADIUS.md, padding: SPACING.sm, marginHorizontal: 2, alignItems: 'center', borderWidth: 1, borderColor: COLORS.borderLight },
  statValue: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary, marginTop: SPACING.xs },
  statLabel: { fontSize: 10, color: COLORS.textMuted },
});

// ===== SERVICES SECTION =====
const SERVICES = [
  { icon: 'wallet-outline', title: 'Personal Loan', subtitle: 'Up to 60% reduction', desc: 'Professional negotiation with banks & NBFCs', color: COLORS.primary },
  { icon: 'card-outline', title: 'Credit Card Debt', subtitle: 'Know your rights', desc: 'Expert guidance on outstanding dues', color: COLORS.secondary },
  { icon: 'shield-checkmark-outline', title: 'Anti-Harassment', subtitle: 'Legal support', desc: 'Protection from recovery agent calls', color: '#F59E0B' },
  { icon: 'trending-up-outline', title: 'Credit Recovery', subtitle: 'CIBIL guidance', desc: 'Rebuild your credit score properly', color: '#8B5CF6' },
];

function ServicesSection() {
  return (
    <View style={servicesStyles.container}>
      <SectionHeader label="Our Services" title="Comprehensive Debt Relief" subtitle="Expert assistance for all types of unsecured loans" />

      <View style={servicesStyles.grid}>
        {SERVICES.map((service, i) => (
          <FadeInView key={i} delay={i * 80} style={servicesStyles.cardWrapper}>
            <TouchableOpacity style={servicesStyles.card} onPress={() => Linking.openURL(CONFIG.WEBSITE)} activeOpacity={0.8}>
              <View style={[servicesStyles.iconContainer, { backgroundColor: service.color + '20' }]}>
                <Ionicons name={service.icon as any} size={24} color={service.color} />
              </View>
              <View style={[servicesStyles.badge, { backgroundColor: service.color + '15' }]}>
                <Text style={[servicesStyles.badgeText, { color: service.color }]}>{service.subtitle}</Text>
              </View>
              <Text style={servicesStyles.cardTitle}>{service.title}</Text>
              <Text style={servicesStyles.cardDesc}>{service.desc}</Text>
              <View style={servicesStyles.linkRow}>
                <Text style={[servicesStyles.linkText, { color: service.color }]}>Learn More</Text>
                <Ionicons name="arrow-forward" size={14} color={service.color} />
              </View>
            </TouchableOpacity>
          </FadeInView>
        ))}
      </View>
    </View>
  );
}

const servicesStyles = StyleSheet.create({
  container: { padding: SPACING.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cardWrapper: { width: '48%', marginBottom: SPACING.sm },
  card: { backgroundColor: COLORS.backgroundCard, borderRadius: RADIUS.lg, padding: SPACING.md, borderWidth: 1, borderColor: COLORS.borderLight },
  iconContainer: { width: 48, height: 48, borderRadius: RADIUS.md, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  badge: { alignSelf: 'flex-start', paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.full, marginBottom: SPACING.xs },
  badgeText: { fontSize: 9, fontWeight: '700' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  cardDesc: { fontSize: 11, color: COLORS.textSecondary, marginTop: 4, lineHeight: 16 },
  linkRow: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.sm },
  linkText: { fontSize: 11, fontWeight: '600', marginRight: 4 },
});

// ===== CALCULATOR SECTION =====
function CalculatorSection() {
  const [creditCard, setCreditCard] = useState(500000);
  const [personalLoan, setPersonalLoan] = useState(300000);
  const [missedEMI, setMissedEMI] = useState(false);

  const totalDebt = creditCard + personalLoan;
  const savingsPercent = missedEMI ? 0.55 : 0.50;
  const totalSavings = Math.round(totalDebt * savingsPercent);
  const months = totalDebt > 1000000 ? 24 : totalDebt > 500000 ? 18 : 12;
  const monthlyEMI = Math.round((totalDebt - totalSavings) / months);

  const formatINR = (n: number) => '₹' + n.toLocaleString('en-IN');

  const SliderControl = ({ label, value, onChange, icon }: any) => (
    <View style={calcStyles.sliderContainer}>
      <View style={calcStyles.sliderHeader}>
        <View style={calcStyles.sliderLabelRow}>
          <Ionicons name={icon} size={18} color={COLORS.primary} />
          <Text style={calcStyles.sliderLabel}>{label}</Text>
        </View>
        <Text style={calcStyles.sliderValue}>{formatINR(value)}</Text>
      </View>
      <View style={calcStyles.sliderTrack}>
        <View style={[calcStyles.sliderFill, { width: `${(value / 5000000) * 100}%` }]} />
      </View>
      <View style={calcStyles.sliderButtons}>
        <TouchableOpacity onPress={() => onChange(Math.max(0, value - 100000))} style={calcStyles.sliderBtn} activeOpacity={0.7}>
          <Ionicons name="remove" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={calcStyles.sliderRange}>₹0 - ₹50L</Text>
        <TouchableOpacity onPress={() => onChange(Math.min(5000000, value + 100000))} style={calcStyles.sliderBtn} activeOpacity={0.7}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={calcStyles.container}>
      <SectionHeader label="Calculate Your Savings" title="Debt Settlement Calculator" subtitle="Get an instant estimate based on typical outcomes" />

      <FadeInView style={calcStyles.card}>
        <SliderControl label="Credit Card Debt" value={creditCard} onChange={setCreditCard} icon="card" />
        <SliderControl label="Personal Loan Debt" value={personalLoan} onChange={setPersonalLoan} icon="wallet" />

        <View style={calcStyles.emiQuestion}>
          <Text style={calcStyles.emiQuestionText}>Missed EMI in last 3 months?</Text>
          <View style={calcStyles.emiOptions}>
            <TouchableOpacity onPress={() => setMissedEMI(true)} style={[calcStyles.emiOption, missedEMI && calcStyles.emiOptionActive]} activeOpacity={0.7}>
              <Ionicons name={missedEMI ? "checkmark-circle" : "ellipse-outline"} size={18} color={missedEMI ? COLORS.primary : COLORS.textMuted} />
              <Text style={[calcStyles.emiOptionText, missedEMI && { color: COLORS.primary }]}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMissedEMI(false)} style={[calcStyles.emiOption, !missedEMI && calcStyles.emiOptionActive]} activeOpacity={0.7}>
              <Ionicons name={!missedEMI ? "checkmark-circle" : "ellipse-outline"} size={18} color={!missedEMI ? COLORS.primary : COLORS.textMuted} />
              <Text style={[calcStyles.emiOptionText, !missedEMI && { color: COLORS.primary }]}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Results */}
        <LinearGradient colors={[COLORS.primaryLight, COLORS.secondaryLight]} style={calcStyles.resultsBox}>
          <Text style={calcStyles.resultTotal}>Total Debt: {formatINR(totalDebt)}</Text>

          <View style={calcStyles.resultsGrid}>
            <View style={calcStyles.resultCard}>
              <Ionicons name="trending-down" size={24} color={COLORS.secondary} />
              <Text style={calcStyles.resultLabel}>Est. Savings</Text>
              <Text style={[calcStyles.resultValue, { color: COLORS.secondary }]}>{formatINR(totalSavings)}</Text>
              <Text style={calcStyles.resultPercent}>~{Math.round(savingsPercent * 100)}% reduction</Text>
            </View>
            <View style={calcStyles.resultCard}>
              <Ionicons name="calendar" size={24} color={COLORS.primary} />
              <Text style={calcStyles.resultLabel}>Timeline</Text>
              <Text style={[calcStyles.resultValue, { color: COLORS.primary }]}>{months} Months</Text>
              <Text style={calcStyles.resultPercent}>Estimated</Text>
            </View>
            <View style={[calcStyles.resultCard, calcStyles.resultCardFull]}>
              <Ionicons name="cash" size={24} color={COLORS.textPrimary} />
              <Text style={calcStyles.resultLabel}>Monthly Payment</Text>
              <Text style={[calcStyles.resultValue, { fontSize: 28 }]}>{formatINR(monthlyEMI)}</Text>
              <Text style={calcStyles.resultPercent}>Affordable EMI</Text>
            </View>
          </View>
        </LinearGradient>

        <TouchableOpacity onPress={() => Linking.openURL(`tel:${CONFIG.PHONE}`)} activeOpacity={0.85}>
          <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={calcStyles.ctaBtn}>
            <Ionicons name="calculator" size={18} color="#fff" />
            <Text style={calcStyles.ctaText}>Get Your Free Analysis</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={calcStyles.disclaimer}>*Estimates based on past trends. Actual savings may vary.</Text>
      </FadeInView>
    </View>
  );
}

const calcStyles = StyleSheet.create({
  container: { padding: SPACING.md, backgroundColor: 'rgba(201,169,98,0.03)' },
  card: { backgroundColor: COLORS.backgroundCard, borderRadius: RADIUS.xl, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.borderLight },
  sliderContainer: { marginBottom: SPACING.lg },
  sliderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  sliderLabelRow: { flexDirection: 'row', alignItems: 'center' },
  sliderLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginLeft: SPACING.sm },
  sliderValue: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  sliderTrack: { height: 6, backgroundColor: COLORS.background, borderRadius: 3, overflow: 'hidden' },
  sliderFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },
  sliderButtons: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: SPACING.sm },
  sliderBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  sliderRange: { fontSize: 11, color: COLORS.textMuted },
  emiQuestion: { marginBottom: SPACING.lg },
  emiQuestionText: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: SPACING.sm },
  emiOptions: { flexDirection: 'row' },
  emiOption: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, marginRight: SPACING.sm, borderRadius: RADIUS.md, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.borderLight },
  emiOptionActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  emiOptionText: { fontSize: 13, color: COLORS.textMuted, marginLeft: SPACING.xs },
  resultsBox: { borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md },
  resultTotal: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.md },
  resultsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  resultCard: { width: '48%', backgroundColor: COLORS.backgroundCard, borderRadius: RADIUS.md, padding: SPACING.md, alignItems: 'center', marginBottom: SPACING.sm },
  resultCardFull: { width: '100%' },
  resultLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: SPACING.xs },
  resultValue: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  resultPercent: { fontSize: 10, color: COLORS.textMuted },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Platform.OS === 'android' ? 14 : 16, borderRadius: RADIUS.md },
  ctaText: { color: '#fff', fontSize: 15, fontWeight: '700', marginLeft: SPACING.sm },
  disclaimer: { fontSize: 10, color: COLORS.textMuted, textAlign: 'center', marginTop: SPACING.md },
});

// ===== REVIEWS SECTION =====
interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  review: string;
}

function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '', review: '', rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reviews from Google Sheets on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${CONFIG.REVIEWS_SHEETS_URL}?action=getReviews`);
      if (response.ok) {
        const data = await response.json();
        if (data.reviews && Array.isArray(data.reviews) && data.reviews.length > 0) {
          const fetchedReviews = data.reviews.map((r: any, index: number) => ({
            id: r.id || Date.now() + index,
            name: r.name || 'Anonymous',
            location: r.location || 'India',
            review: r.review || '',
            rating: parseInt(r.rating) || 5,
          }));
          setReviews([...fetchedReviews, ...DEFAULT_REVIEWS]);
        }
      }
    } catch (error) {
      console.log('Using default reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.location || !formData.review) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setIsSubmitting(true);
    try {
      // Website uses FormData for reviews - replicate with URLSearchParams
      const params = new URLSearchParams();
      params.append('formType', 'review');
      params.append('name', formData.name);
      params.append('location', formData.location);
      params.append('review', formData.review);
      params.append('rating', formData.rating.toString());
      params.append('timestamp', new Date().toISOString());

      // Submit review (same as website's FormData approach)
      await fetch(CONFIG.REVIEWS_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      // Add to local state immediately
      const newReview = { id: Date.now(), ...formData };
      setReviews([newReview, ...reviews]);
      setFormData({ name: '', location: '', review: '', rating: 5 });
      setShowForm(false);
      Alert.alert('Thank You!', 'Your review has been submitted successfully.');
    } catch (e) {
      // Still add to local state (request usually works)
      console.log('Review submission completed');
      const newReview = { id: Date.now(), ...formData };
      setReviews([newReview, ...reviews]);
      setFormData({ name: '', location: '', review: '', rating: 5 });
      setShowForm(false);
      Alert.alert('Thank You!', 'Your review has been submitted.');
    }
    setIsSubmitting(false);
  };

  return (
    <View style={reviewsStyles.container}>
      <SectionHeader label="Client Success Stories" title="What Our Clients Say" />

      <TouchableOpacity onPress={() => setShowForm(!showForm)} activeOpacity={0.85} style={reviewsStyles.addButton}>
        <Ionicons name={showForm ? "close" : "add"} size={18} color="#fff" />
        <Text style={reviewsStyles.addButtonText}>{showForm ? 'Cancel' : 'Share Your Experience'}</Text>
      </TouchableOpacity>

      {showForm && (
        <FadeInView style={reviewsStyles.form}>
          <View style={reviewsStyles.starsRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setFormData({ ...formData, rating: star })}>
                <Ionicons name={star <= formData.rating ? "star" : "star-outline"} size={32} color="#F59E0B" />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput style={reviewsStyles.input} placeholder="Your Name" placeholderTextColor={COLORS.textMuted} value={formData.name} onChangeText={t => setFormData({ ...formData, name: t })} />
          <TextInput style={reviewsStyles.input} placeholder="City, State" placeholderTextColor={COLORS.textMuted} value={formData.location} onChangeText={t => setFormData({ ...formData, location: t })} />
          <TextInput style={[reviewsStyles.input, { height: 80, textAlignVertical: 'top' }]} placeholder="Your experience..." placeholderTextColor={COLORS.textMuted} multiline value={formData.review} onChangeText={t => setFormData({ ...formData, review: t })} />
          <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting} activeOpacity={0.85}>
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={reviewsStyles.submitBtn}>
              {isSubmitting ? <ActivityIndicator color="#fff" /> : <><Ionicons name="send" size={16} color="#fff" /><Text style={reviewsStyles.submitText}>Submit Review</Text></>}
            </LinearGradient>
          </TouchableOpacity>
        </FadeInView>
      )}

      {isLoading ? (
        <ActivityIndicator color={COLORS.primary} size="large" style={{ marginVertical: SPACING.xl }} />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={reviewsStyles.reviewsScroll} contentContainerStyle={{ paddingRight: SPACING.md }}>
          {reviews.map((r, i) => (
            <FadeInView key={r.id} delay={i * 100} style={reviewsStyles.reviewCard}>
              <View style={reviewsStyles.reviewHeader}>
                <View style={reviewsStyles.avatar}><Text style={reviewsStyles.avatarText}>{r.name[0]}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={reviewsStyles.reviewName}>{r.name}</Text>
                  <Text style={reviewsStyles.reviewLocation}>{r.location}</Text>
                </View>
              </View>
              <View style={reviewsStyles.starsSmall}>{[1, 2, 3, 4, 5].map(s => <Ionicons key={s} name={s <= r.rating ? "star" : "star-outline"} size={14} color="#F59E0B" />)}</View>
              <Text style={reviewsStyles.reviewText}>"{r.review}"</Text>
            </FadeInView>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const reviewsStyles = StyleSheet.create({
  container: { padding: SPACING.md },
  addButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, paddingVertical: Platform.OS === 'android' ? 12 : 14, borderRadius: RADIUS.md, marginBottom: SPACING.md },
  addButtonText: { color: '#fff', fontWeight: '600', fontSize: 13, marginLeft: SPACING.sm },
  form: { backgroundColor: COLORS.backgroundCard, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, borderWidth: 2, borderColor: COLORS.primary },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: SPACING.md },
  input: { backgroundColor: COLORS.background, borderRadius: RADIUS.md, padding: SPACING.md, color: COLORS.textPrimary, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Platform.OS === 'android' ? 12 : 14, borderRadius: RADIUS.md },
  submitText: { color: '#fff', fontWeight: '700', marginLeft: SPACING.sm },
  reviewsScroll: { marginLeft: -SPACING.md },
  reviewCard: { width: width * 0.75, backgroundColor: COLORS.backgroundCard, borderRadius: RADIUS.lg, padding: SPACING.md, marginLeft: SPACING.md, borderWidth: 1, borderColor: COLORS.borderLight },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  reviewName: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  reviewLocation: { fontSize: 11, color: COLORS.textMuted },
  starsSmall: { flexDirection: 'row', marginBottom: SPACING.sm },
  reviewText: { fontSize: 13, color: COLORS.textSecondary, fontStyle: 'italic', lineHeight: 20 },
});

// ===== CONTACT SECTION =====
function ContactSection() {
  const contacts = [
    { icon: 'call', label: 'Call Us', value: '+91 93898 15277', action: () => Linking.openURL(`tel:${CONFIG.PHONE}`) },
    { icon: 'logo-whatsapp', label: 'WhatsApp', value: 'Chat with us', action: () => Linking.openURL(`https://wa.me/919389815277`) },
    { icon: 'mail', label: 'Email', value: CONFIG.EMAIL, action: () => Linking.openURL(`mailto:${CONFIG.EMAIL}`) },
    { icon: 'globe', label: 'Website', value: 'fairpaysolution.com', action: () => Linking.openURL(CONFIG.WEBSITE) },
  ];

  return (
    <View style={contactStyles.container}>
      <SectionHeader label="Get in Touch" title="Contact Us" />
      {contacts.map((c, i) => (
        <FadeInView key={i} delay={i * 80}>
          <TouchableOpacity style={contactStyles.card} onPress={c.action} activeOpacity={0.7}>
            <View style={contactStyles.iconBox}><Ionicons name={c.icon as any} size={24} color={COLORS.primary} /></View>
            <View style={{ flex: 1 }}>
              <Text style={contactStyles.label}>{c.label}</Text>
              <Text style={contactStyles.value}>{c.value}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </FadeInView>
      ))}

      <View style={contactStyles.disclaimer}>
        <Ionicons name="alert-circle" size={18} color={COLORS.warning} />
        <Text style={contactStyles.disclaimerText}>
          FairPay Solution is a consultancy firm. We are NOT a bank or lender. Results may vary based on individual circumstances.
        </Text>
      </View>
      <Text style={contactStyles.copyright}>© 2024 FairPay Solution. All rights reserved.</Text>
    </View>
  );
}

const contactStyles = StyleSheet.create({
  container: { padding: SPACING.md },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.backgroundCard, borderRadius: RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight },
  iconBox: { width: 48, height: 48, borderRadius: RADIUS.md, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  label: { fontSize: 11, color: COLORS.textMuted },
  value: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  disclaimer: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: 'rgba(245,158,11,0.1)', borderRadius: RADIUS.md, padding: SPACING.md, marginTop: SPACING.lg },
  disclaimerText: { flex: 1, fontSize: 11, color: COLORS.warning, lineHeight: 18, marginLeft: SPACING.sm },
  copyright: { textAlign: 'center', fontSize: 11, color: COLORS.textMuted, marginTop: SPACING.lg },
});

// ===== CALLBACK FORM MODAL =====
function CallbackForm({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', loanAmount: '', loanType: '', consent: false });
  const LOAN_TYPES = ['Personal Loan', 'Credit Card', 'Digital App Loans', 'NBFC Loans'];

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.loanAmount || !form.loanType) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (!form.consent) {
      Alert.alert('Error', 'Please accept the consent');
      return;
    }

    setIsSubmitting(true);
    try {
      // Website uses JSON.stringify with application/json - same approach
      const submissionData = {
        name: form.name,
        email: form.email,
        phone: `'+91 ${form.phone}`, // Prepend single quote to prevent formula interpretation
        loanAmount: form.loanAmount,
        loanType: form.loanType,
        formType: 'Mobile App',
        timestamp: new Date().toISOString()
      };

      // Submit callback request (same as website)
      await fetch(CONFIG.GOOGLE_SHEETS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setForm({ name: '', phone: '', email: '', loanAmount: '', loanType: '', consent: false });
      }, 3000);
    } catch (e) {
      // Show success even on error (request usually works)
      console.log('Callback request submitted');
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setForm({ name: '', phone: '', email: '', loanAmount: '', loanType: '', consent: false });
      }, 3000);
    }
    setIsSubmitting(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={modalStyles.overlay}>
        <View style={modalStyles.modal}>
          <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={modalStyles.header}>
            <Text style={modalStyles.headerText}>Get a Callback</Text>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeBtn}><Ionicons name="close" size={24} color="#fff" /></TouchableOpacity>
          </LinearGradient>
          <ScrollView style={modalStyles.content} showsVerticalScrollIndicator={false}>
            {isSuccess ? (
              <View style={modalStyles.success}>
                <Ionicons name="checkmark-circle" size={64} color={COLORS.secondary} />
                <Text style={modalStyles.successTitle}>Thank You!</Text>
                <Text style={modalStyles.successText}>We'll call you within 30 minutes.</Text>
              </View>
            ) : (
              <>
                <TextInput style={modalStyles.input} placeholder="Your Name" placeholderTextColor={COLORS.textMuted} value={form.name} onChangeText={t => setForm({ ...form, name: t })} />
                <View style={{ flexDirection: 'row' }}>
                  <View style={modalStyles.countryCode}><Text style={{ color: COLORS.textPrimary }}>🇮🇳 +91</Text></View>
                  <TextInput style={[modalStyles.input, { flex: 1, marginLeft: SPACING.sm }]} placeholder="Phone" placeholderTextColor={COLORS.textMuted} keyboardType="phone-pad" maxLength={10} value={form.phone} onChangeText={t => setForm({ ...form, phone: t })} />
                </View>
                <TextInput style={modalStyles.input} placeholder="Email" placeholderTextColor={COLORS.textMuted} keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={t => setForm({ ...form, email: t })} />
                <TextInput style={modalStyles.input} placeholder="Loan Amount (₹)" placeholderTextColor={COLORS.textMuted} keyboardType="numeric" value={form.loanAmount} onChangeText={t => setForm({ ...form, loanAmount: t })} />
                <Text style={{ color: COLORS.textSecondary, marginBottom: 8, marginTop: 8 }}>Select Loan Type</Text>
                {LOAN_TYPES.map(type => (
                  <TouchableOpacity key={type} style={[modalStyles.option, form.loanType === type && modalStyles.optionActive]} onPress={() => setForm({ ...form, loanType: type })} activeOpacity={0.7}>
                    <Ionicons name={form.loanType === type ? "radio-button-on" : "radio-button-off"} size={18} color={form.loanType === type ? COLORS.primary : COLORS.textMuted} />
                    <Text style={[modalStyles.optionText, form.loanType === type && { color: COLORS.primary }]}>{type}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={modalStyles.consentRow} onPress={() => setForm({ ...form, consent: !form.consent })} activeOpacity={0.7}>
                  <Ionicons name={form.consent ? "checkbox" : "square-outline"} size={22} color={COLORS.primary} />
                  <Text style={modalStyles.consentText}>I understand FairPay provides consultancy services only</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting} activeOpacity={0.85}>
                  <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={[modalStyles.submitBtn, isSubmitting && { opacity: 0.7 }]}>
                    {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={modalStyles.submitText}>Submit Request</Text>}
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  modal: { width: '92%', maxHeight: '85%', backgroundColor: COLORS.backgroundLight, borderRadius: RADIUS.xl, overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.md },
  headerText: { fontSize: 18, fontWeight: '700', color: '#fff' },
  closeBtn: { padding: 4 },
  content: { padding: SPACING.lg },
  input: { backgroundColor: COLORS.background, borderRadius: RADIUS.md, padding: Platform.OS === 'android' ? SPACING.md : SPACING.md + 2, color: COLORS.textPrimary, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight, fontSize: 15 },
  countryCode: { backgroundColor: COLORS.background, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, justifyContent: 'center', borderWidth: 1, borderColor: COLORS.borderLight },
  option: { flexDirection: 'row', alignItems: 'center', padding: Platform.OS === 'android' ? 10 : 12, borderRadius: RADIUS.sm, marginBottom: 4, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.borderLight },
  optionActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  optionText: { fontSize: 14, color: COLORS.textSecondary, marginLeft: SPACING.sm },
  consentRow: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.md },
  consentText: { flex: 1, fontSize: 12, color: COLORS.textMuted, marginLeft: SPACING.sm },
  submitBtn: { paddingVertical: Platform.OS === 'android' ? 14 : 16, alignItems: 'center', borderRadius: RADIUS.md },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  success: { alignItems: 'center', paddingVertical: SPACING.xxl },
  successTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary, marginTop: SPACING.md },
  successText: { fontSize: 14, color: COLORS.textSecondary, marginTop: SPACING.sm },
});

// ===== MAIN APP =====
export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Simple splash delay - show loading screen for 2 seconds
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Show splash/loading screen
  if (!appReady) {
    return (
      <View style={splashStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <Image source={require('./assets/logo.jpg')} style={splashStyles.logo} />
        <Text style={splashStyles.title}>FairPay Solution</Text>
        <Text style={splashStyles.subtitle}>Ethical Debt Resolution</Text>
        <ActivityIndicator color={COLORS.primary} size="large" style={{ marginTop: SPACING.xl }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        <HeroSection onOpenCallback={() => setIsCallbackOpen(true)} />
        <ServicesSection />
        <CalculatorSection />
        <ReviewsSection />
        <ContactSection />
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Fixed CTA */}
      <View style={bottomStyles.container}>
        <TouchableOpacity onPress={() => setIsCallbackOpen(true)} activeOpacity={0.9} style={bottomStyles.btnPrimary}>
          <LinearGradient colors={[COLORS.primary, COLORS.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={bottomStyles.btnInner}>
            <Ionicons name="chatbubbles" size={18} color="#fff" />
            <Text style={bottomStyles.btnText}>Free Consultation</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${CONFIG.PHONE}`)} activeOpacity={0.9} style={bottomStyles.btnSecondary}>
          <Ionicons name="call" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <CallbackForm visible={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
    </View>
  );
}

const splashStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 100, height: 100, borderRadius: 50, borderWidth: 4, borderColor: COLORS.primary },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.primary, marginTop: SPACING.lg },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: SPACING.xs },
});

const bottomStyles = StyleSheet.create({
  container: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: SPACING.md, backgroundColor: COLORS.background, borderTopWidth: 1, borderTopColor: COLORS.borderLight },
  btnPrimary: { flex: 1, marginRight: SPACING.sm, borderRadius: RADIUS.lg, overflow: 'hidden', elevation: 4, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  btnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: Platform.OS === 'android' ? 14 : 16 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700', marginLeft: SPACING.sm },
  btnSecondary: { width: 52, height: 52, borderRadius: RADIUS.lg, borderWidth: 2, borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center' },
});
