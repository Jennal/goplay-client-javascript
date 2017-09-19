var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pkg = (function() {

    var pkg = {};

    pkg.Status = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OK"] = 0;
        values[valuesById[144] = "ERR"] = 144;
        values[valuesById[145] = "ERR_WRONG_PARAMS"] = 145;
        values[valuesById[146] = "ERR_DECODE_FAILED"] = 146;
        values[valuesById[147] = "ERR_TIMEOUT"] = 147;
        values[valuesById[148] = "ERR_EMPTY_RESULT"] = 148;
        return values;
    })();

    pkg.ErrorMessage = (function() {

        function ErrorMessage(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        ErrorMessage.prototype.Code = 0;
        ErrorMessage.prototype.Message = "";

        ErrorMessage.create = function create(properties) {
            return new ErrorMessage(properties);
        };

        ErrorMessage.encode = function encode(m, w) {
            if (!w)
                w = $Writer.create();
            if (m.Code != null && m.hasOwnProperty("Code"))
                w.uint32(8).int32(m.Code);
            if (m.Message != null && m.hasOwnProperty("Message"))
                w.uint32(18).string(m.Message);
            return w;
        };

        ErrorMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        ErrorMessage.decode = function decode(r, l) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l, m = new $root.pkg.ErrorMessage();
            while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                case 1:
                    m.Code = r.int32();
                    break;
                case 2:
                    m.Message = r.string();
                    break;
                default:
                    r.skipType(t & 7);
                    break;
                }
            }
            return m;
        };

        ErrorMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        ErrorMessage.verify = function verify(m) {
            if (typeof m !== "object" || m === null)
                return "object expected";
            if (m.Code != null && m.hasOwnProperty("Code")) {
                switch (m.Code) {
                default:
                    return "Code: enum value expected";
                case 0:
                case 144:
                case 145:
                case 146:
                case 147:
                case 148:
                    break;
                }
            }
            if (m.Message != null && m.hasOwnProperty("Message")) {
                if (!$util.isString(m.Message))
                    return "Message: string expected";
            }
            return null;
        };

        ErrorMessage.fromObject = function fromObject(d) {
            if (d instanceof $root.pkg.ErrorMessage)
                return d;
            var m = new $root.pkg.ErrorMessage();
            switch (d.Code) {
            case "OK":
            case 0:
                m.Code = 0;
                break;
            case "ERR":
            case 144:
                m.Code = 144;
                break;
            case "ERR_WRONG_PARAMS":
            case 145:
                m.Code = 145;
                break;
            case "ERR_DECODE_FAILED":
            case 146:
                m.Code = 146;
                break;
            case "ERR_TIMEOUT":
            case 147:
                m.Code = 147;
                break;
            case "ERR_EMPTY_RESULT":
            case 148:
                m.Code = 148;
                break;
            }
            if (d.Message != null) {
                m.Message = String(d.Message);
            }
            return m;
        };

        ErrorMessage.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.defaults) {
                d.Code = o.enums === String ? "OK" : 0;
                d.Message = "";
            }
            if (m.Code != null && m.hasOwnProperty("Code")) {
                d.Code = o.enums === String ? $root.pkg.Status[m.Code] : m.Code;
            }
            if (m.Message != null && m.hasOwnProperty("Message")) {
                d.Message = m.Message;
            }
            return d;
        };

        ErrorMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ErrorMessage;
    })();

    pkg.HostPort = (function() {

        function HostPort(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        HostPort.prototype.Host = "";
        HostPort.prototype.Port = 0;

        HostPort.create = function create(properties) {
            return new HostPort(properties);
        };

        HostPort.encode = function encode(m, w) {
            if (!w)
                w = $Writer.create();
            if (m.Host != null && m.hasOwnProperty("Host"))
                w.uint32(10).string(m.Host);
            if (m.Port != null && m.hasOwnProperty("Port"))
                w.uint32(16).int32(m.Port);
            return w;
        };

        HostPort.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        HostPort.decode = function decode(r, l) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l, m = new $root.pkg.HostPort();
            while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                case 1:
                    m.Host = r.string();
                    break;
                case 2:
                    m.Port = r.int32();
                    break;
                default:
                    r.skipType(t & 7);
                    break;
                }
            }
            return m;
        };

        HostPort.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        HostPort.verify = function verify(m) {
            if (typeof m !== "object" || m === null)
                return "object expected";
            if (m.Host != null && m.hasOwnProperty("Host")) {
                if (!$util.isString(m.Host))
                    return "Host: string expected";
            }
            if (m.Port != null && m.hasOwnProperty("Port")) {
                if (!$util.isInteger(m.Port))
                    return "Port: integer expected";
            }
            return null;
        };

        HostPort.fromObject = function fromObject(d) {
            if (d instanceof $root.pkg.HostPort)
                return d;
            var m = new $root.pkg.HostPort();
            if (d.Host != null) {
                m.Host = String(d.Host);
            }
            if (d.Port != null) {
                m.Port = d.Port | 0;
            }
            return m;
        };

        HostPort.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.defaults) {
                d.Host = "";
                d.Port = 0;
            }
            if (m.Host != null && m.hasOwnProperty("Host")) {
                d.Host = m.Host;
            }
            if (m.Port != null && m.hasOwnProperty("Port")) {
                d.Port = m.Port;
            }
            return d;
        };

        HostPort.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HostPort;
    })();

    pkg.HandShakeClientData = (function() {

        function HandShakeClientData(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        HandShakeClientData.prototype.ClientType = "";
        HandShakeClientData.prototype.ClientVersion = "";
        HandShakeClientData.prototype.DictMd5 = "";

        HandShakeClientData.create = function create(properties) {
            return new HandShakeClientData(properties);
        };

        HandShakeClientData.encode = function encode(m, w) {
            if (!w)
                w = $Writer.create();
            if (m.ClientType != null && m.hasOwnProperty("ClientType"))
                w.uint32(10).string(m.ClientType);
            if (m.ClientVersion != null && m.hasOwnProperty("ClientVersion"))
                w.uint32(18).string(m.ClientVersion);
            if (m.DictMd5 != null && m.hasOwnProperty("DictMd5"))
                w.uint32(26).string(m.DictMd5);
            return w;
        };

        HandShakeClientData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        HandShakeClientData.decode = function decode(r, l) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l, m = new $root.pkg.HandShakeClientData();
            while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                case 1:
                    m.ClientType = r.string();
                    break;
                case 2:
                    m.ClientVersion = r.string();
                    break;
                case 3:
                    m.DictMd5 = r.string();
                    break;
                default:
                    r.skipType(t & 7);
                    break;
                }
            }
            return m;
        };

        HandShakeClientData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        HandShakeClientData.verify = function verify(m) {
            if (typeof m !== "object" || m === null)
                return "object expected";
            if (m.ClientType != null && m.hasOwnProperty("ClientType")) {
                if (!$util.isString(m.ClientType))
                    return "ClientType: string expected";
            }
            if (m.ClientVersion != null && m.hasOwnProperty("ClientVersion")) {
                if (!$util.isString(m.ClientVersion))
                    return "ClientVersion: string expected";
            }
            if (m.DictMd5 != null && m.hasOwnProperty("DictMd5")) {
                if (!$util.isString(m.DictMd5))
                    return "DictMd5: string expected";
            }
            return null;
        };

        HandShakeClientData.fromObject = function fromObject(d) {
            if (d instanceof $root.pkg.HandShakeClientData)
                return d;
            var m = new $root.pkg.HandShakeClientData();
            if (d.ClientType != null) {
                m.ClientType = String(d.ClientType);
            }
            if (d.ClientVersion != null) {
                m.ClientVersion = String(d.ClientVersion);
            }
            if (d.DictMd5 != null) {
                m.DictMd5 = String(d.DictMd5);
            }
            return m;
        };

        HandShakeClientData.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.defaults) {
                d.ClientType = "";
                d.ClientVersion = "";
                d.DictMd5 = "";
            }
            if (m.ClientType != null && m.hasOwnProperty("ClientType")) {
                d.ClientType = m.ClientType;
            }
            if (m.ClientVersion != null && m.hasOwnProperty("ClientVersion")) {
                d.ClientVersion = m.ClientVersion;
            }
            if (m.DictMd5 != null && m.hasOwnProperty("DictMd5")) {
                d.DictMd5 = m.DictMd5;
            }
            return d;
        };

        HandShakeClientData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HandShakeClientData;
    })();

    pkg.HandShakeResponse = (function() {

        function HandShakeResponse(p) {
            this.Routes = {};
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }

        HandShakeResponse.prototype.ServerVersion = "";
        HandShakeResponse.prototype.Now = "";
        HandShakeResponse.prototype.HeartBeatRate = 0;
        HandShakeResponse.prototype.Routes = $util.emptyObject;
        HandShakeResponse.prototype.IsReconnect = false;
        HandShakeResponse.prototype.ReconnectTo = null;

        HandShakeResponse.create = function create(properties) {
            return new HandShakeResponse(properties);
        };

        HandShakeResponse.encode = function encode(m, w) {
            if (!w)
                w = $Writer.create();
            if (m.ServerVersion != null && m.hasOwnProperty("ServerVersion"))
                w.uint32(10).string(m.ServerVersion);
            if (m.Now != null && m.hasOwnProperty("Now"))
                w.uint32(18).string(m.Now);
            if (m.HeartBeatRate != null && m.hasOwnProperty("HeartBeatRate"))
                w.uint32(24).int32(m.HeartBeatRate);
            if (m.Routes != null && m.hasOwnProperty("Routes")) {
                for (var ks = Object.keys(m.Routes), i = 0; i < ks.length; ++i) {
                    w.uint32(34).fork().uint32(10).string(ks[i]).uint32(16).uint32(m.Routes[ks[i]]).ldelim();
                }
            }
            if (m.IsReconnect != null && m.hasOwnProperty("IsReconnect"))
                w.uint32(40).bool(m.IsReconnect);
            if (m.ReconnectTo != null && m.hasOwnProperty("ReconnectTo"))
                $root.pkg.HostPort.encode(m.ReconnectTo, w.uint32(50).fork()).ldelim();
            return w;
        };

        HandShakeResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        HandShakeResponse.decode = function decode(r, l) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l, m = new $root.pkg.HandShakeResponse(), k;
            while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                case 1:
                    m.ServerVersion = r.string();
                    break;
                case 2:
                    m.Now = r.string();
                    break;
                case 3:
                    m.HeartBeatRate = r.int32();
                    break;
                case 4:
                    r.skip().pos++;
                    if (m.Routes === $util.emptyObject)
                        m.Routes = {};
                    k = r.string();
                    r.pos++;
                    m.Routes[k] = r.uint32();
                    break;
                case 5:
                    m.IsReconnect = r.bool();
                    break;
                case 6:
                    m.ReconnectTo = $root.pkg.HostPort.decode(r, r.uint32());
                    break;
                default:
                    r.skipType(t & 7);
                    break;
                }
            }
            return m;
        };

        HandShakeResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        HandShakeResponse.verify = function verify(m) {
            if (typeof m !== "object" || m === null)
                return "object expected";
            if (m.ServerVersion != null && m.hasOwnProperty("ServerVersion")) {
                if (!$util.isString(m.ServerVersion))
                    return "ServerVersion: string expected";
            }
            if (m.Now != null && m.hasOwnProperty("Now")) {
                if (!$util.isString(m.Now))
                    return "Now: string expected";
            }
            if (m.HeartBeatRate != null && m.hasOwnProperty("HeartBeatRate")) {
                if (!$util.isInteger(m.HeartBeatRate))
                    return "HeartBeatRate: integer expected";
            }
            if (m.Routes != null && m.hasOwnProperty("Routes")) {
                if (!$util.isObject(m.Routes))
                    return "Routes: object expected";
                var k = Object.keys(m.Routes);
                for (var i = 0; i < k.length; ++i) {
                    if (!$util.isInteger(m.Routes[k[i]]))
                        return "Routes: integer{k:string} expected";
                }
            }
            if (m.IsReconnect != null && m.hasOwnProperty("IsReconnect")) {
                if (typeof m.IsReconnect !== "boolean")
                    return "IsReconnect: boolean expected";
            }
            if (m.ReconnectTo != null && m.hasOwnProperty("ReconnectTo")) {
                {
                    var e = $root.pkg.HostPort.verify(m.ReconnectTo);
                    if (e)
                        return "ReconnectTo." + e;
                }
            }
            return null;
        };

        HandShakeResponse.fromObject = function fromObject(d) {
            if (d instanceof $root.pkg.HandShakeResponse)
                return d;
            var m = new $root.pkg.HandShakeResponse();
            if (d.ServerVersion != null) {
                m.ServerVersion = String(d.ServerVersion);
            }
            if (d.Now != null) {
                m.Now = String(d.Now);
            }
            if (d.HeartBeatRate != null) {
                m.HeartBeatRate = d.HeartBeatRate | 0;
            }
            if (d.Routes) {
                if (typeof d.Routes !== "object")
                    throw TypeError(".pkg.HandShakeResponse.Routes: object expected");
                m.Routes = {};
                for (var ks = Object.keys(d.Routes), i = 0; i < ks.length; ++i) {
                    m.Routes[ks[i]] = d.Routes[ks[i]] >>> 0;
                }
            }
            if (d.IsReconnect != null) {
                m.IsReconnect = Boolean(d.IsReconnect);
            }
            if (d.ReconnectTo != null) {
                if (typeof d.ReconnectTo !== "object")
                    throw TypeError(".pkg.HandShakeResponse.ReconnectTo: object expected");
                m.ReconnectTo = $root.pkg.HostPort.fromObject(d.ReconnectTo);
            }
            return m;
        };

        HandShakeResponse.toObject = function toObject(m, o) {
            if (!o)
                o = {};
            var d = {};
            if (o.objects || o.defaults) {
                d.Routes = {};
            }
            if (o.defaults) {
                d.ServerVersion = "";
                d.Now = "";
                d.HeartBeatRate = 0;
                d.IsReconnect = false;
                d.ReconnectTo = null;
            }
            if (m.ServerVersion != null && m.hasOwnProperty("ServerVersion")) {
                d.ServerVersion = m.ServerVersion;
            }
            if (m.Now != null && m.hasOwnProperty("Now")) {
                d.Now = m.Now;
            }
            if (m.HeartBeatRate != null && m.hasOwnProperty("HeartBeatRate")) {
                d.HeartBeatRate = m.HeartBeatRate;
            }
            var ks2;
            if (m.Routes && (ks2 = Object.keys(m.Routes)).length) {
                d.Routes = {};
                for (var j = 0; j < ks2.length; ++j) {
                    d.Routes[ks2[j]] = m.Routes[ks2[j]];
                }
            }
            if (m.IsReconnect != null && m.hasOwnProperty("IsReconnect")) {
                d.IsReconnect = m.IsReconnect;
            }
            if (m.ReconnectTo != null && m.hasOwnProperty("ReconnectTo")) {
                d.ReconnectTo = $root.pkg.HostPort.toObject(m.ReconnectTo, o);
            }
            return d;
        };

        HandShakeResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HandShakeResponse;
    })();

    return pkg;
})();