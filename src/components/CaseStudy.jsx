import React, { useState } from 'react';
import { Code, BookOpen, HardDrive, RefreshCw } from 'lucide-react';

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
}`
  };

  return (
    <section id="case-study" className="section" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="container case-study-grid">
        <div className="cs-content">
          <span className="section-subtitle">Case Study</span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: 'var(--text-highlight)' }}>
            LinkArise Offline Sync Architecture
          </h2>
          <p className="cs-desc">
            To address frequent network connectivity dropouts in remote areas for delivery agents and telecallers, I designed a reliable offline-first database queue and synchronization framework in Flutter using Hive DB and custom interceptors.
          </p>
          
          <div className="cs-stats">
            <div className="cs-stat">
              <h4>98%</h4>
              <span>Sync Rate</span>
            </div>
            <div className="cs-stat">
              <h4>40%</h4>
              <span>Data Saving</span>
            </div>
            <div className="cs-stat">
              <h4>100%</h4>
              <span>Offline Work</span>
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
