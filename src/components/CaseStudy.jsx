import React, { useState } from 'react';
import { Code, BookOpen, HardDrive, MapPin } from 'lucide-react';

export default function CaseStudy() {
  const [activeTab, setActiveTab] = useState('sync');

  const codeData = {
    sync: `import 'package:http/http.dart' as http;
import 'package:hive/hive.dart';

class SyncService {
  final Box _queueBox = Hive.box('sync_queue');
  final String _baseUrl = "https://api.linkarise.com/v1";

  Future<void> queueRequest(String endpoint, Map<String, dynamic> data) async {
    final payload = {
      'endpoint': endpoint,
      'body': data,
      'timestamp': DateTime.now().toIso8601String()
    };
    await _queueBox.add(payload);
    processQueue();
  }

  Future<void> processQueue() async {
    if (_queueBox.isEmpty) return;
    
    for (int i = 0; i < _queueBox.length; i++) {
      final task = _queueBox.getAt(i);
      try {
        final res = await http.post(
          Uri.parse('$_baseUrl\${task['endpoint']}'),
          body: task['body']
        );
        if (res.statusCode == 200) {
          await _queueBox.deleteAt(i);
        }
      } catch (e) {
        print("Sync failed: Retry scheduled.");
        break; // Network down, halt queue processing
      }
    }
  }
}`,
    local: `import 'package:hive_flutter/hive_flutter.dart';

class LocalDatabase {
  static Future<void> initialize() async {
    await Hive.initFlutter();
    
    // Register adapter for CRM Leads
    Hive.registerAdapter(LeadAdapter());
    
    // Open standard operational boxes
    await Hive.openBox('sync_queue');
    await Hive.openBox<Lead>('crm_leads');
    await Hive.openBox('location_logs');
  }
}

@HiveType(typeId: 1)
class Lead extends HiveObject {
  @HiveField(0)
  late String id;
  
  @HiveField(1)
  late String name;
  
  @HiveField(2)
  late String phone;
  
  @HiveField(3)
  late String status;
}`,
    location: `import 'dart:async';
import 'package:geolocator/geolocator.dart';
import 'package:hive/hive.dart';

class LocationTrackingService {
  final Box _locationBox = Hive.box('location_logs');
  Timer? _gpsTimer;
  Timer? _uploadTimer;

  /// 1. Request explicit location permission with clear rationale
  Future<bool> requestLocationPermission() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) return false;

    LocationPermission perm = await Geolocator.checkPermission();
    if (perm == LocationPermission.denied) {
      perm = await Geolocator.requestPermission();
      if (perm == LocationPermission.denied) return false;
    }
    return perm == LocationPermission.always || perm == LocationPermission.whileInUse;
  }

  /// 2. Fetch device location every 1 min & save locally in Hive
  void startTracking(String userId) {
    // 📍 GPS location fetch every 1 minute
    _gpsTimer = Timer.periodic(const Duration(minutes: 1), (_) async {
      Position pos = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high
      );
      
      final record = {
        'userId': userId,
        'latitude': pos.latitude,
        'longitude': pos.longitude,
        'accuracy': pos.accuracy,
        'timestamp': DateTime.now().toIso8601String(),
      };
      
      await _locationBox.add(record); // 💾 Save locally
    });

    // ☁️ Batch upload accumulated locations to server every 5 minutes
    _uploadTimer = Timer.periodic(const Duration(minutes: 5), (_) async {
      await uploadAccumulatedLocations();
    });
  }

  /// 3. Upload collected locations to server in batch
  Future<void> uploadAccumulatedLocations() async {
    if (_locationBox.isEmpty) return;
    
    final logs = _locationBox.values.toList();
    final res = await ApiClient.post('/api/location/batch-sync', body: logs);
    
    if (res.statusCode == 200) {
      await _locationBox.clear(); // Clear local cache on successful upload
    }
  }
}`
  };

  return (
    <section id="case-study" className="section" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="container case-study-grid">
        <div className="cs-content">
          <span className="section-subtitle">Case Study</span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: 'var(--text-highlight)' }}>
            LinkArise Sync & Background Location Architecture
          </h2>
          <p className="cs-desc">
            Designed an offline-first sync engine & background location tracking system in Flutter. Fetches GPS coordinates every 1 minute, stores logs locally in Hive DB, and syncs accumulated batch records to the server every 5 minutes while observing background location rules.
          </p>
          
          <div className="cs-stats">
            <div className="cs-stat">
              <h4>1 Min</h4>
              <span>GPS Fetch</span>
            </div>
            <div className="cs-stat">
              <h4>5 Min</h4>
              <span>Server Sync</span>
            </div>
            <div className="cs-stat">
              <h4>100%</h4>
              <span>Offline Persistence</span>
            </div>
          </div>
        </div>

        <div className="ide-widget">
          <div className="ide-header">
            <div className="ide-tabs">
              <button 
                className={`ide-tab ${activeTab === 'sync' ? 'active' : ''}`}
                onClick={() => setActiveTab('sync')}
              >
                <Code size={14} className="ide-file-icon" /> sync_service.dart
              </button>
              <button 
                className={`ide-tab ${activeTab === 'local' ? 'active' : ''}`}
                onClick={() => setActiveTab('local')}
              >
                <HardDrive size={14} className="ide-file-icon" /> local_database.dart
              </button>
              <button 
                className={`ide-tab ${activeTab === 'location' ? 'active' : ''}`}
                onClick={() => setActiveTab('location')}
              >
                <MapPin size={14} className="ide-file-icon" /> location_service.dart
              </button>
            </div>
            <span className="ide-info">Flutter/Dart Sandbox</span>
          </div>
          <div className="ide-body">
            <pre className="ide-code">
              <code>{codeData[activeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
