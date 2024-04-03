﻿using FuzulEv.Business.Utils.AddressDomain.Models;

using JsonNet.ContractResolvers;

using Microsoft.Extensions.Caching.Memory;

using Newtonsoft.Json;

using System.Text;

namespace FuzulEv.Business.Utils.AddressDomain
{
    public interface IAddressService
    {
        IEnumerable<City> GetCities();

        IEnumerable<District> GetDistricts(string cityCode);

        IEnumerable<District> GetDistricts(string[] cityCodes);
    }

    internal class AddressService : IAddressService
    {
        private readonly string _namespace = "FuzulEv.Business.Utils.AddressDomain.Resources";
        private readonly IMemoryCache _memoryCache;
        private readonly JsonSerializerSettings _jsonSerializerSettings;

        public AddressService(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
            _jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new PrivateSetterContractResolver(),
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            };
        }

        public IEnumerable<City> GetCities()
        {
            return _memoryCache.GetOrCreate("Cities", entry =>
            {
                entry.SetSlidingExpiration(TimeSpan.FromMinutes(10));

                var resource = ReadResource("Cities");

                var cities = JsonConvert.DeserializeObject<IEnumerable<City>>(resource, _jsonSerializerSettings);

                if (cities == null)
                {
                    throw new InvalidOperationException("Can not load city resources.");
                }

                return cities;
            });
        }

        public IEnumerable<District> GetDistricts(string cityCode)
        {
            return _memoryCache.GetOrCreate(cityCode, entry =>
            {
                entry.SetSlidingExpiration(TimeSpan.FromMinutes(10));

                var resource = ReadResource($"Districts.{cityCode}");

                var districts = JsonConvert.DeserializeObject<IEnumerable<District>>(resource, _jsonSerializerSettings);

                if (districts == null)
                {
                    throw new InvalidOperationException("Can not load district resources.");
                }

                return districts;
            });
        }

        public IEnumerable<District> GetDistricts(string[] cityCodes)
        {
            List<District> districts = new List<District>();

            foreach (var cityCode in cityCodes)
            {
                districts.AddRange(GetDistricts(cityCode));
            }

            return districts;
        }

        private string ReadResource(string resourceName)
        {
            var assembly = typeof(AddressService).Assembly;

            using (var stream = assembly.GetManifestResourceStream($"{_namespace}.{resourceName}.json"))
            {
                if (stream == null)
                {
                    throw new InvalidOperationException($"Could not load resource file. ({_namespace}.{resourceName}.json)");
                }

                using (var reader = new StreamReader(stream, Encoding.UTF8))
                {
                    string data = reader.ReadToEnd();
                    if (string.IsNullOrEmpty(data))
                    {
                        throw new InvalidOperationException($"Could not load resource file. ({_namespace}.{resourceName}.json)");
                    }

                    return data;
                }
            }
        }
    }
}
